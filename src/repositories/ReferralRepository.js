import BaseRepository from "./BaseRepository.js";
import ReferralSystem from "../models/ReferalSystem.js";

/**
 * @description BaseRepository
 * @class ReferralRepository
 */
class ReferralRepository extends BaseRepository {
  /**
   * @description create a new document
   * @param {string} model
   * @returns {document} returns a newly created document
   */
  constructor() {
    super(ReferralSystem);
  }

  async getUserReferrals(userId) {
    const lookups = [
      //lookup the Users model with matching finding the invited ids
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "referralDetails",
        },
      },
      //break the documents found
      {
        $unwind: "$referralDetails",
      },
      //lookup Referalsystemm, using the referalDetils of each document to match who they invited using the referredby variable
      {
        $lookup: {
          from: "referalsystems",
          localField: "referralDetails._id",
          foreignField: "referredBy",
          as: "referredUsersByReferred",
        },
      },
      //count the referredUsersByReferred found and add the count to the newfield
      {
        $addFields: {
          "referralDetails.totalInvites": {
            $size: { $ifNull: ["$referredUsersByReferred", []] },
          },
        },
      },
      //group the returned data
      {
        $group: {
          _id: "$_id",
          referalCode: { $first: "$referalCode" },
          referralDetails: { $push: "$referralDetails" },
          totalInvites: { $first: { $size: { $ifNull: ["$referrals", []] } } }, // Add total invites for the main user
        },
      },
    ];

    const projection = {
      referalCode: 1,
      totalInvites: 1,
      "referralDetails.username": 1,
      "referralDetails.avatar": 1,
      "referralDetails.totalInvites": 1,
    };

    const refs = await super.aggregationQueryByUserId(
      "referredBy",
      userId,
      lookups,
      projection
    );
    return refs;
  }

  async getLeaderBoardInviters() {
    const leaders = this.model.aggregate([
      //find all the document with the same referredBy and count it
      {
        $group: {
          _id: "$referredBy",
          totalInvite: { $sum: 1 },
        },
      },
      //sort them in decending order
      {
        $sort: { totalInvite: -1 },
      },
      //lookup the this inviter by the varaible referredBy, and pick out their username avater
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "inviterDetails",
        },
      },
      //break the the documents with unwind stage
      {
        $unwind: "$inviterDetails",
      },
      //now use projection to arrane the returning object
      {
        $project: {
          _id: 0,
          username: "$inviterDetails.username",
          avatar: "$inviterDetails.avatar",
          totalInvite: 1,
        },
      },
    ]);

    return leaders;
  }
}

export default ReferralRepository;
