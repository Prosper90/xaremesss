import Mongoose, { Schema } from "mongoose";

const MinedUrlSchema = new Schema(
  {
    og_user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    sniper_user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    gemaScorePerUrl: {
      type: Number,
      default: 0,
    },
    xeetScorePerUrl: {
      type: Number,
      default: 0,
    },
    numberOfImpression: {
      type: Number,
      default: 0,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    isValidLink: {
      type: Boolean,
    },
    url: {
      type: String,
    },
    is_complete: {
      type: Boolean,
      default: false,
    },
    extractorType: {
      type: String,
      enum: Object.values({ OG: "og", SNIPER: "sniper" }),
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const MinedUrl = Mongoose.model("UrlBank", MinedUrlSchema);

export default MinedUrl;
