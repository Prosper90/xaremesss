import Mongoose, { Schema } from "mongoose";

const XeetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    xeetScore: {
      type: Schema.Types.Decimal128,
      default: 0,
    },
    numberOfImpressionPerAccount: {
      type: Schema.Types.Decimal128,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_At",
      updatedAt: "updated_At",
    },
  }
);

const XeetScores = Mongoose.model("XeetScores", XeetSchema);

export default XeetScores;
