import BaseRepository from "./BaseRepository.js";
import DailyGema from "../models/DailyGema.js";

class DailyGemaRepository extends BaseRepository {
  constructor() {
    super(DailyGema);
  }

  /**
   * @description Get the last claim record for a user
   * @param {string} userId
   * @returns {Object|null} Last claim record or null if none exists
   */
  async getLastClaim(userId) {
    return await this.model.findOne({ userId }).sort({ claimDate: -1 }).exec();
  }

  /**
   * @description Updates the claim date and streak for a user
   * @param {string} userId
   * @param {Date} claimDate
   * @param {number} streak
   * @returns {Object} Updated claim document
   */
  async updateClaim(userId, claimDate, streak) {
    return await this.model.findOneAndUpdate(
      { userId },
      { $set: { claimDate, streak } },
      { upsert: true, new: true }
    ).exec();
  }
}

export default DailyGemaRepository;
