import DailyGemaService from "../services/dailyGemaService.js";
import response from "../utils/response.js";

class DailyGemaController {
  /**
   * @description Claims the daily reward for the user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async claimReward(req, res) {
    try {
      const {user} = req
      const userId = user._id
      const reward = await DailyGemaService.claimDailyReward(userId);
      return response(res, 200, { success: true, message: "Reward claimed successfully", reward });
    } catch (error) {
      return response(res, 500, { success: false, message: error.message || "Error occured in claiming daily reward" });
    }
  }

  static async getDailyGemaStatus(req, res) {
    try {
      const userId = req.user._id;
      const gemaStatus = await DailyGemaService.getDailyGemaStatus(userId);
      return response(res, 200, gemaStatus);
    } catch (error) {
      return response(res, 500, error);
    }
  }
}

export default DailyGemaController;
