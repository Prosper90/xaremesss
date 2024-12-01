import BaseRepository from "./BaseRepository.js";
import PensionAccount from "../models/PensionAccount.js";

/**
 * @description PensionAccountRepository
 * @class PensionAccountRepository
 */
class PensionAccountRepository extends BaseRepository {
  constructor() {
    super(PensionAccount);
  }

  /**
   * @description Find pension account by userId
   * @param {string} userId
   * @returns {Object} Pension Account
   */
  async findByUserId(userId) {
    try {
      return await this.findByField('userId', userId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Increment Gema in pension account by 1
   * @param {string} userId
   * @returns {Object} Updated Pension Account
   */
  async incrementPensionContribution(userId) {
    try {
      return await this.increment(userId, 'gema', 1); // Increment by 1 Gema
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Deduct Gema from the user's pension account
   * @param {string} userId
   * @returns {Object} Updated Pension Account
   */
  async deductPensionContribution(userId) {
    try {
      return await this.increment(userId, 'gema', -1); // Deduct by 1 Gema
    } catch (error) {
      throw error;
    }
  }
}

export default PensionAccountRepository;
