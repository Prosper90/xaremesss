import Mongoose, { Schema } from "mongoose";

// some fields are daily analytics, meaning it will be reset back to 0 at end of each day.
const AnalyticSchema = new Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
      unique: true,
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
    }, // no of xtraction done in a day
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
    }

  },
  { timestamps: { created_At: "created_At", updated_At: "updated_At" } }
);

const Analytic = Mongoose.model("Analytic", AnalyticSchema);

export default Analytic;
