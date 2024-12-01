/**
 * @description Referral controllers
 */

import referralService from "../services/referralService.js";

class ReferralController {
  static async LeaderboardRef(req, res) {
    try {
      const value = await referralService.getHighestInviters();
      res.status(200).json({ status: true, data: value });
    } catch (error) {
      throw error;
    }
  }

  static async UserRef(req, res) {
    try {
      const value = await referralService.getAllReferralsByUser(req.user._id);
      res.status(200).json({ status: true, data: value });
    } catch (error) {
      throw error;
    }
  }
}

export default ReferralController;
