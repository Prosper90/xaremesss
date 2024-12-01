import Mongoose, { Schema } from "mongoose";
import transactionType from "../enums/transactionType.js";
import transactionStatus from "../enums/TransactionStatus.js";

const TransactionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true, // Removed unique to allow multiple transactions for a single user
    },
    xeetScore: {
      type: Number,
      default: 0,
    },
    gemaScore: {
      type: Number,
      default: 0,
    },
    transactionType: {
      type: String,
      enum: Object.values(transactionType), // Corrected format
    },
    transactionStatus: {
      type: String,
      enum: Object.values(transactionStatus), // Corrected format
    },
    referenceId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const Transactions = Mongoose.model("Transactions", TransactionsSchema);

export default Transactions;
