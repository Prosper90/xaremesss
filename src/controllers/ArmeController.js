import ArmeService from "../services/ArmeService.js";
import response from "../utils/response.js";

class ArmeController {
  static async purchaseIncubateXeetCard(req, res) {
    try {
      const { userId } = req.body;

      const result = await ArmeService.purchaseIncubateXeetCard(userId);

      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error purchasing incubate Xeet card",
        error: error.message,
      });
    }
  }

  static async generateArme(req, res) {
    try {
      const { userId } = req.body;

      const result = await ArmeService.generateArme(userId);

      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error generating Arme",
        error: error.message,
      });
    }
  }

  static async extractToTon(req, res) {
    try {
      const { userId } = req.body;

      const result = await ArmeService.extractToTon(userId);

      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error extracting to Ton",
        error: error.message,
      });
    }
  }
}

export default ArmeController;
