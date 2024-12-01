import DailyGemaRepository from "../repositories/DailyGemaRepository.js";
import Logger from "../middlewares/log.js";
import GemaService from "./gemaService.js";
import moment from "moment";

const dailyGemaRepository = new DailyGemaRepository();

class DailyGemaService {

   /**
   * @description Claims the daily gema reward for a user
   * @param {string} userId
   * @returns {Promise<Object>} Reward details
   */
   static async claimDailyReward(userId) {
    try {
      const today = moment().startOf("day");
      const lastClaim = await dailyGemaRepository.getLastClaim(userId);
      
      let streak = 0;
      let rewardAmount = 0;

      // Check if user has already claimed today's reward
      if (lastClaim) {
        const claimDate = moment(lastClaim.claimDate).startOf("day");

        // If the claim was today, throw an error
        if (claimDate.isSame(today)) {
          throw new Error("Reward already claimed for today");
        }
        // If the claim was yesterday, continue the streak
        else if (claimDate.isSame(today.clone().subtract(1, "day"))) {
          streak = lastClaim.streak + 1;
          if (streak > 31) {
            streak = 1;
          }
        }
        // If it was before yesterday, reset the streak
        else {
          streak = 1;
        }
      } else {
        throw new Error("User's daily gema data not found");
      }

      // Calculate reward based on the updated streak
      if (streak >= 31) {
        rewardAmount = 100;  // Maximum reward on day 31
      } else if (streak <= 10) {
        rewardAmount = 1;
      } else if (streak <= 20) {
        rewardAmount = 2;
      } else if (streak <= 30) {
        rewardAmount = 3;
      }

      // Update the streak and reward details in the database
      await dailyGemaRepository.updateClaim(userId, today.toDate(), streak);
      await GemaService.rewardGema(userId, rewardAmount);

      return { streak, rewardAmount, dailyGemaClaimed: true };
    } catch (error) {
      Logger.logger.error("Error in daily gema claim:", error);
      throw error;
    }
  }

  static async getDailyGemaStatus(userId) {
    try {
      // Fetch the user's daily gema data
      const userGema = await dailyGemaRepository.getLastClaim(userId);

      if (!userGema) {
        throw new Error("User's daily gema data not found");
      }

      const today = moment().startOf("day");
      const claimDate = moment(userGema.claimDate).startOf("day");
      let dailyGemaClaimed = false;
      let streak = userGema.streak;

      // Check if the claimDate is today
      if (claimDate.isSame(today)) {
        dailyGemaClaimed = true;
      } 
      // Check if the claimDate is yesterday
      else if (claimDate.isSame(today.clone().subtract(1, "day"))) {
        if (streak >= 31) {
          streak = 0;
        }
        dailyGemaClaimed = false;
      } 
      // If claimDate is older, reset the streak
      else {
        streak = 0;
        dailyGemaClaimed = false;
      }

      // Update the streak and return the result
      await dailyGemaRepository.update(userId, { streak });
      return { userId, streak, dailyGemaClaimed };
    } catch (error) {
      throw error;
    }
  }
}

export default DailyGemaService;
