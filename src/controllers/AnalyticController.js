import AnalyticService from "../services/AnalyticService.js";
import response from "../utils/response.js";

class AnalyticsController {

  /**
   * @description Get combined analytics data
   * @param {object} req
   * @param {object} res
   * @returns {object} JSON response
   */
  static async getAnalytics(req, res) {
    try {
      const {historyDate} = req.body // the date the data should be gotten from (eg 24hr ago.)
      const {user} = req
      const userId = user._id

      const analyticsData = await AnalyticService.getAnalytics(userId, historyDate);

      return response(res, 200, {
        success: true,
        message: "Analytics data retrieved successfully",
        data: analyticsData,
      });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
}

export default AnalyticsController;
