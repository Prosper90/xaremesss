import xeetService from "../services/xeetService.js";
import response from "../utils/response.js";

class XeetController {
  static async fetchAllXeetsByUser(req, res) {
    try {
      const { userId } = req.params;
      const xeets = await xeetService.fetchAllXeetsByUser(userId);
      return response(res, 200, { success: true, xeets });
    } catch (error) {
      return response(res, 500, { success: false, message: error.message });
    }
  }

  static async mintXeetScore(req, res) {
    try {
      const { userId } = req.params;
      const { impressionsToMint } = req.body;

      if (impressionsToMint <= 0) {
        return response(res, 400, {
          success: false,
          message: "Invalid impressions amount",
        });
      }

      const updatedXeet = await xeetService.mintXeetScore(
        userId,
        impressionsToMint
      );
      return response(res, 200, { success: true, xeet: updatedXeet });
    } catch (error) {
      return response(res, 500, { success: false, message: error.message });
    }
  }
}

export default XeetController;
