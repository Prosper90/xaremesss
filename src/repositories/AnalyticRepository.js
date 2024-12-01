import BaseRepository from "./BaseRepository.js";
import Analytic from "../../src/models/Analytic.js";

/**
 * @description AnalyticRepository
 * @class AnalyticRepository
 */
class AnalyticRepository extends BaseRepository {
  constructor() {
    super(Analytic);
  }

  /**
   * @description Find analytics by userId
   * @param {string} userId
   * @returns {Object} Analytics data for the user
   */
  async findByUserId(userId) {
    try {
      return await this.findByField('userId', userId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Increment multiple fields in the analytics for a specific user
   * @param {string} userId
   * @param {object} fieldsToIncrement - Fields and values to increment (e.g., { todayGema: 5, totalPostMined: 10 })
   * @returns {object} Updated document
   */
  async incrementFields(userId, fieldsToIncrement) {
    try {
      const updatedDocument = await Analytic.findOneAndUpdate(
        { userId }, // Filter by userId
        { $inc: fieldsToIncrement }, // Increment the specified fields
        { new: true, upsert: true } // Return the updated document, create if not exists
      );
      return updatedDocument;
    } catch (error) {
      throw error;
    }
  }
}

export default AnalyticRepository;
