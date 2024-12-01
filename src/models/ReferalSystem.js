import Mongoose, { Schema } from "mongoose";

const ReferalSchema = new Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    referalCode: {
      type: String,
      unique: true,
    },

    referredBy: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const ReferalSystem = Mongoose.model("ReferalSystem", ReferalSchema);

export default ReferalSystem;
