import PensionService from "../services/PensionService.js";
import response from "../utils/response.js";

class PensionController {
  /**
   * @description Toggle Pension Fund Contribution (On/Off)
   * @param {object} req
   * @param {object} res
   * @returns {object} JSON response
   */
  static async togglePension(req, res) {
    try {
      const { userId } = req.body;
      const { isActive } = req.body;  // true for activation, false for deactivation

      const result = await PensionService.togglePensionFund(userId, isActive);
      
      return response(res, 200, { success: true, message: result.message });
    } catch (error) {
      return response(res, 500, { success: false, message: "Server error", error: error.message });
    }
  }
}

export default PensionController;
