import Mongoose, { Schema } from "mongoose";
import userRanks from "../enums/userRanks.js";

const PensionAccountSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    gema: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { created_At: "created_At", updated_At: "updated_At" } }
);

const PensionAccount = Mongoose.model("PensionAccount", PensionAccountSchema);

export default PensionAccount;
