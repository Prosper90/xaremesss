import BaseRepository from "./BaseRepository.js";
import Users from "../../src/models/Users.js";
import GemaScores from "../models/Gema.js";
import TonWallet from "../models/TonWallet.js";
import Ranks from "../models/Ranks.js";
import mongoose from "mongoose";
import XeetScores from "../models/Xeets.js";
import DailyGemaClaim from "../models/DailyGemaClaims.js";

/**
 * @description BaseRepository
 * @class BaseRepository
 */
class UsersRepository extends BaseRepository {
  /**
   * @description create a new document
   * @param {string} model
   * @returns {document} returns a newly created document
   */
  constructor() {
    super(Users);
  }

  /**
   * @description Get user card details by userId
   * @param {string} userId
   * @returns {Object} returns User card details
   */
  async getUserCardDetails(userId) {
    const lookups = [
      {
        $lookup: {
          from: "Gemascores", // Collection for GemaScores
          localField: "_id",
          foreignField: "userId",
          as: "gemaScoreData",
        },
      },
      {
        $lookup: {
          from: "Tonwallets", // Collection for TonWallets
          localField: "_id",
          foreignField: "userId",
          as: "walletData",
        },
      },
      {
        $lookup: {
          from: "Ranks", // Collection for Ranks
          localField: "_id",
          foreignField: "userId",
          as: "rankData",
        },
      },
    ];

    const projection = {
      _id: 0,
      xHandle: 1,
      "gemaScoreData.gemaScore": {
        $arrayElemAt: ["$gemaScoreData.gemaScore", 0],
      },
      "walletData.walletAddress": {
        $arrayElemAt: ["$walletData.walletAddress", 0],
      },
      "walletData.walletUserName": {
        $arrayElemAt: ["$walletData.walletUserName", 0],
      },
      "rankData.rank": { $arrayElemAt: ["$rankData.rank", 0] },
      "rankData.refillSpeed": { $arrayElemAt: ["$rankData.refillSpeed", 0] },
    };

    return await super.aggregationQueryByUserId(
      "userId",
      userId,
      lookups,
      projection
    );
  }

  /**
   * @description Update user profile by user ID
   * @param {string} userId - ID of the user to update
   * @param {Object} updateData - Data to update in the user profile
   * @returns {Object|null} Updated user profile or null if no match
   */
  async updateUserProfile(userId, updateData) {
    try {
      const updatedUser = await super.update(userId, updateData);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user profile: ${error.message}`);
    }
  }

  /**
   * @description Get user details by id
   * @param {String} id - The user's ID
   * @returns {Object} Returns user details
   */
  async getUserAllDetails(id) {
    try {
      console.log(id, "id coming in");
      const isObjectId = mongoose.Types.ObjectId.isValid(id);

      if (!isObjectId) {
        throw new Error("Invalid ID format");
      }

      const objectId = new mongoose.Types.ObjectId(id);

      const user = await Users.findOne({ _id: objectId }).lean();

      if (!user) throw new Error("User not found");

      const [
        gemaScoreData,
        walletData,
        rankData,
        XeetData,
        dailyGemaClaimsData,
      ] = await Promise.all([
        GemaScores.find({ userId: objectId }).lean(),
        TonWallet.find({ userId: objectId }).lean(),
        Ranks.find({ userId: objectId }).lean(),
        XeetScores.find({ userId: objectId }).lean(),
        DailyGemaClaim.find({ userId: objectId }).lean(),
      ]);

      return {
        user,
        gemaScoreData,
        walletData,
        rankData,
        XeetData,
        dailyGemaClaimsData,
      };
    } catch (error) {
      console.error("Error in getUserAllDetails:", error.message);
      throw error;
    }
  }
}

export default UsersRepository;
