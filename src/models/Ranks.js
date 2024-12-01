import Mongoose, { Schema } from "mongoose";
import userRanks from "../enums/userRanks.js";
import rankColor from "../enums/rankColor.js";
import extractLimit from "../enums/extractLimit.js";
import refillSpeed from "../enums/refillSpeed.js";
import upgradeCost from "../enums/upgradeCost.js";

const RankSchema = new Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    rank: {
      type: String,
      default: userRanks.OBSERVER,
      enum: Object.values(userRanks),
    },
    rankColor: {
      type: String,
      default: rankColor.OBSERVER,
      enum: Object.values(rankColor),
    },
    xtractLimit: {
      type: Number,
      default: extractLimit.OBSERVER,
      enum: Object.values(extractLimit),
    },
    refillSpeed: {
      type: Number,
      default: refillSpeed.OBSERVER,
      enum: Object.values(refillSpeed),
    },
    upgradeCost: {
      type: Number,
      default: upgradeCost.OBSERVER,
      enum: Object.values(upgradeCost),
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const Ranks = Mongoose.model("Ranks", RankSchema);

export default Ranks;
