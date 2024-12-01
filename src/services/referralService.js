import ReferralRepository from "../repositories/ReferralRepository.js";

const referralRepository = new ReferralRepository();
/**
 * @description helper
 * @class referralService
 */
export default class {
  static async getHighestInviters() {
    try {
      const highestInviters = await referralRepository.getLeaderBoardInviters();
      return highestInviters;
    } catch (error) {
      throw error;
    }
  }

  static async getAllReferralsByUser(user_id) {
    try {
      const totalRef = await referralRepository.getUserReferrals(user_id);
      return totalRef;
    } catch (error) {
      throw error;
    }
  }

  static async create(user_id, inviteCode, inviter) {
    try {
      referralRepository.create({
        userId: user_id,
        referalCode: inviteCode,
        referredBy: inviter,
      });
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }
}
