import Mongoose, { Schema } from "mongoose";

const AnalyticHistorySchema = new Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    todayGema: {
        type: Number,
        default: 0,
    }, // no of Gema collected in a day
    todayXeet: {
        type: Number,
        default: 0,
    }, // no of Gema collected in a day
    xtractionPerDay: {
        type: Number,
        default: 0
    }, // no of xtraction don in a day
    totalPostMined: {
        type: Number,
        default: 0
    },
    totalXeetExtracted: {
        type: Number,
        default: 0
    },
    totalGemaExtracted: {
        type: Number,
        default: 0
    },
    totalLinksSubmitted: {
        type: Number,
        default: 0
    },
    successfulMines: {
        type: Number,
        default: 0
    },
    failedMines: {
        type: Number,
        default: 0
    },
    daysPensionContributed: {
        type: Number,
        default: 0
    },
    daysPensionSkipped: {
        type: Number,
        default: 0
    },
    created_At: {
      type: Date,
      default: Date.now,
    },
    terminationDate: {
      type: Date,  // Date when this document should be deleted
      required: true,
    },
  },
  { timestamps: { created_At: "created_At", updated_At: "updated_At" } }
);

const AnalyticHistory = Mongoose.model("AnalyticHistory", AnalyticHistorySchema);

export default AnalyticHistory;
