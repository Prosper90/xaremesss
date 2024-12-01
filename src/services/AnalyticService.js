

import AnalyticRepository from "../repositories/AnalyticRepository.js";
import AnalyticHistoryRepository from "../repositories/AnalyticHistoryRepository.js";
import Logger from "../middlewares/log.js";
import simplifyRatio from "../utils/ratio.js";
import moment from 'moment';

const analyticRepository = new AnalyticRepository();
const analyticHistoryRepository = new AnalyticHistoryRepository();



export default class AnalyticService {
  /**
   * @description Update analytic data for a user and store history
   * @param {string} userId
   * @param {object} fieldsToIncrement - Object where keys are fields to increment, and values are the amountBy (e.g., { todayGema: 5, totalPostMined: 10 })
   * @returns {object} Updated analytic data
   */
  static async updateAnalytics(userId, fieldsToIncrement) {
    try {

      // Build the $inc object dynamically based on the fieldsToIncrement
      const incrementFields = {};
      for (const [field, amountBy] of Object.entries(fieldsToIncrement)) {
        incrementFields[field] = amountBy;
      }

      // Update multiple fields by incrementing their values
      const updatedAnalytics = await analyticRepository.incrementFields(userId, incrementFields);

      // Save the current state into the AnalyticHistory collection
      const historyData = {
        userId: updatedAnalytics.userId,
        todayGema: updatedAnalytics.todayGema,
        todayXeet: updatedAnalytics.todayXeet,
        totalPostMined: updatedAnalytics.totalPostMined,
        totalXeetExtracted: updatedAnalytics.totalXeetExtracted,
        totalGemaExtracted: updatedAnalytics.totalGemaExtracted,
        totalLinksSubmitted: updatedAnalytics.totalLinksSubmitted,
        successfulMines: updatedAnalytics.successfulMines,
        failedMines: updatedAnalytics.failedMines,
        daysPensionContributed: updatedAnalytics.daysPensionContributed,
        daysPensionSkipped: updatedAnalytics.daysPensionSkipped,
        xtractionPerDay: updatedAnalytics.xtractionPerDay,
        created_At: updatedAnalytics.updated_At,
        terminationDate: moment().add(30, 'days').toDate(), // Set termination date to 30 days from now
      };

      await analyticHistoryRepository.create(historyData);  // Save the history

      return updatedAnalytics;
    } catch (error) {
      Logger.logger.error(error);
      throw error;
    }
  }

  // cron job: delete at the end of each day
  static async deleteOldAnalyticsHistory() {
    try {
      await analyticHistoryRepository.model.deleteMany({
        terminationDate: { $lte: new Date() },  // Delete documents whose terminationDate is in the past
      });
      console.log("Old analytics history deleted successfully.");
    } catch (error) {
      Logger.logger.error("Error deleting old analytics history:", error);
      console.error("Error deleting old analytics history:", error);
    }
  };


  /**
  * @description Reset daily analytics fields (todayGema, todayXeet, xtractionPerDay) to 0 at the end of the day
  */
  static async resetDailyAnalytics() {
    try {
      await analyticRepository.updateMany(
        {},
        {
          todayGema: 0,
          todayXeet: 0,
          xtractionPerDay: 0
        }
      );
      console.log("Daily analytics reset to 0 successfully.");
    } catch (error) {
      Logger.logger.error("Error resetting daily analytics:", error);
      throw error;
    }
  }



  /**
   * @description Get analytics data and additional information from other models using aggregation, with optional historical query
   * @param {string} userId
   * @param {Date} [historyDate] - Optional date for historical analytics (e.g., 24 hours ago)
   * @returns {object} Combined analytics data
   */
  static async getAnalytics(userId, historyDate = null) {
    try {
      let analyticsData;
      let delta = {}; // To store the difference in values over the time range

      // Get current analytics data
      const lookups = [
        {
          $lookup: {
            from: "Ranks", // The Rank collection
            localField: "userId",
            foreignField: "userId",
            as: "rankData",
          },
        },
        {
          $lookup: {
            from: "PensionAccounts", // The PensionAccount collection
            localField: "userId",
            foreignField: "userId",
            as: "pensionData",
          },
        },
      ];

      const projection = {
        _id: 0,
        userId: 1,
        todayGema: 1,
        todayXeet: 1,
        totalPostMined: 1,
        totalXeetExtracted: 1,
        totalGemaExtracted: 1,
        totalLinksSubmitted: 1,
        successfulMines: 1,
        failedMines: 1,
        daysPensionContributed: 1,
        daysPensionSkipped: 1,
        xtractionPerDay: 1,
        // Rank data
        "rankData.rank": { $arrayElemAt: ["$rankData.rank", 0] },
        "rankData.refillSpeed": { $arrayElemAt: ["$rankData.refillSpeed", 0] },
        // Pension data
        "pensionData.gema": { $arrayElemAt: ["$pensionData.gema", 0] },
      };

      analyticsData = await analyticRepository.aggregationQueryByUserId(
        "userId",
        userId,
        lookups,
        projection
      );

      if (!analyticsData) throw new Error("No analytics data found for this user.");

      // If a historical date (historyDate) is provided, fetch the analytics state from 24 hours ago (or other specified time)
      if (historyDate) {
        const history = await analyticHistoryRepository.model.findOne({
          userId: userId,
          created_At: { $lte: new Date(historyDate) },
        })
          .sort({ created_At: -1 })
          .lean();

        // Calculate the differences (delta) for the specific fields
        delta = {
          postsMinedAdded: analyticsData.totalPostMined - (history?.totalPostMined || 0),
          gemaExtractedAdded: analyticsData.totalGemaExtracted - (history?.totalGemaExtracted || 0),
          xeetExtractedAdded: analyticsData.totalXeetExtracted - (history?.totalXeetExtracted || 0),
          linksSubmittedAdded: analyticsData.totalLinksSubmitted - (history?.totalLinksSubmitted || 0),
          successfulMinesAdded: analyticsData.successfulMines - (history?.successfulMines || 0),
          failedMinesAdded: analyticsData.failedMines - (history?.failedMines || 0),
        };

        const successfulMines = delta.successfulMinesAdded || 0;
        const failedMines = delta.failedMinesAdded || 0;
        const totalMines = successfulMines + failedMines;
        let successPercentage = "N/A";

        if (totalMines > 0) {
          successPercentage = ((successfulMines / totalMines) * 100).toFixed(2) + "%";
        } else {
          successPercentage = "0%";
        }

        delta.successPercentageAdded = successPercentage;

      }

      // ===== Add Ratios and Percentages =====
      // Today Xeet to Gema Ratio
      const todayXeet = analyticsData.todayXeet || 0;
      const todayGema = analyticsData.todayGema || 0;
      let xeetToGemaRatio = "N/A";

      if (todayGema > 0) {
        xeetToGemaRatio = simplifyRatio(todayXeet, todayGema);
      } else if (todayXeet > 0) {
        xeetToGemaRatio = `${todayXeet}:0`;
      } else {
        xeetToGemaRatio = `0:0`;
      }

      // Calculate Success Percentage for Mines
      const successfulMines = analyticsData.successfulMines || 0;
      const failedMines = analyticsData.failedMines || 0;
      const totalMines = successfulMines + failedMines;
      let successPercentage = "N/A";

      if (totalMines > 0) {
        successPercentage = ((successfulMines / totalMines) * 100).toFixed(2) + "%";
      } else {
        successPercentage = "0%";
      }

      analyticsData.todayXeetToGemaRatio = xeetToGemaRatio;
      analyticsData.successPercentage = successPercentage;

      return {
        ...analyticsData,
        ...delta, // This contains the amount added in the last time range
      };
    } catch (error) {
      Logger.logger.error("Error fetching analytics data:", error);
      throw error;
    }
  }
}