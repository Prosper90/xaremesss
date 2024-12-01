import Mongoose, { Schema } from "mongoose";

const TonWalletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    walletAddress: {
      type: String,
      unique: true,
      required: false,
    },
    walletUserName: {
      type: String,
    },
    walletDetails: {
      type: Object,
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const TonWallet = Mongoose.model("TonWallet", TonWalletSchema);

export default TonWallet;
