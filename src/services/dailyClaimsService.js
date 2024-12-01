import DailyGemaClaimsRepository from "../repositories/DailyGemaClaimsRepository.js";
import GemaRepository from "../repositories/gemaRepository.js";
import logger from "../middlewares/log.js";

const gemaRepository = new GemaRepository();
const dailyGemaClaimsRepository = new DailyGemaClaimsRepository();
/**
 * @description helper
 * @class dailyGemaCLaimsService
 */
export default class {
    /**
   * @description reset daily streek to 0 for the user
   * @param {string} userId 
   * @param {number} amount 
   * @returns {Object} Updated daily streek
   */
  static async gainStreak(user_id, amount) {
    try {
      await gemaRepository.increment(user_id, "gemaScore", amount);
      amount === 100
        ? await this.resetDailyClaimStreak(user_id)
        : await dailyGemaClaimsRepository.increment(user_id, "dailyStreak", 1);
      dailyGemaClaimsRepository.update(user_id, {
        $set: {
          ["PreviousStreakCollected"]: true,
          ["PreviousCollectedTime"]: Date.now(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get user card details by userId
   * @param {string} userId
   * @returns {Object} returns User card details
   */
  static async getUserDailyGemaClaims(user_id) {
    try {
      const userDailyGemaClaim = await dailyGemaClaimsRepository.findByField(
        "userId",
        user_id
      );
      if (!userDailyGemaClaim) throw new Error("This data does not exist");

      const PCT = new Date(userDailyGemaClaim.PreviousCollectedTime);

      const diffIHrs = (new Date() - PCT) / (1000 * 60 * 60);
      diffIHrs > 24
        ? userDailyClaims.PreviousStreakCollected
          ? 0
          : await this.resetDailyClaimStreak(user._id)
        : 0;

      return userDailyGemaClaim;
    } catch (error) {
      console.log(error.data);
      throw error;
    }
  }

  /**
   * @description reset daily streek to 0 for the user
   * @param {string} userId
   * @returns {Object} Updated daily streek
   */
  static async resetDailyClaimStreak(userId) {
    try {
      return await dailyGemaClaimsRepository.reset(userId, "dailyStreak"); // reset  saily streek to 0
    } catch (error) {
      throw error;
    }
  }

  static async create(user_id) {
    try {
      dailyGemaClaimsRepository.create({
        userId: user_id,
      });
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }
}
