import dailyClaimsService from "../services/dailyClaimsService.js";

/**
 * @description DailyClaimsController
 */
class DailyClaimsController {
  /**
   * @description Handles all Daily Gema Claims request
   * @param  {object} req
   * @param {object} res
   * @returns {object} a json object
   * @memberof DailyClaimsController
   */

  static async getUserDailyClaims(req, res) {
    try {
      const user = req.user; // Depends on frontend always
      const userDailyClaims = await dailyClaimsService.getUserDailyGemaClaims(
        user._id
      );

      return res.status(200).json({
        message: "Successfully retrieved",
        data: userDailyClaims,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: 121,
        data: error.message,
      });
    }
  }

  static async updateUserDailyClaims(req, res) {
    try {
      const user = req.user; // Depends on frontend
      const userDailyClaims = await dailyClaimsService.getUserDailyGemaClaims(
        user._id
      );
      const streak = userDailyClaims.streak;
      streak > 10
        ? streak > 20
          ? streak > 30
            ? await dailyClaimsService.gainStreak(user._id, 100)
            : await dailyClaimsService.gainStreak(user._id, 3)
          : await dailyClaimsService.gainStreak(user._id, 2)
        : await dailyClaimsService.gainStreak(user._id, 1);

      return res.status(200).json({
        message: "Successfully retrieved",
        data: userDailyClaims,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: 121,
        data: error.message,
      });
    }
  }
}

export default DailyClaimsController;
