import BaseRepository from "./BaseRepository.js";
import Xeet from "../models/Xeets.js";

/**
 * @description BaseRepository
 * @class XeetRepository
 */
class XeetRepository extends BaseRepository {
  /**
   * @description create a new document
   * @param {string} model
   * @returns {document} returns a newly created document
   */
  constructor() {
    super(Xeet);
  }

  /**
   * @description Fetch all Xeets by a user
   * @param {string} userId - User ID to fetch all xeets for
   * @returns {Array<Document>} Array of xeets associated with the user
   */
  async fetchAllXeetsByUser(userId) {
    try {
      const xeets = await this.findByFieldAll("userId", userId);
      return xeets;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Mint xeetScore by a specific amount of numberOfImpressionPerAccount
   * @param {string} userId - User ID to mint impressions for
   * @param {number} amountToMint - Number of impressions to mint
   * @returns {Document} Updated document with new xeetScore and impression count
   */
  async mintXeetScore(userId, amountToMint) {
    try {
      const xeet = await this.findByField("userId", userId);
      if (!xeet) throw new Error("Xeet document not found for user");

      if (xeet.numberOfImpressionPerAccount < amountToMint) {
        throw new Error("Insufficient impressions for minting");
      }

      const scoreToAdd = amountToMint / 1000000;

      const updatedXeet = await this.update(userId, {
        $inc: {
          xeetScore: scoreToAdd,
          numberOfImpressionPerAccount: -amountToMint,
        },
      });

      return updatedXeet;
    } catch (error) {
      throw error;
    }
  }
}

export default XeetRepository;
