import Mongoose, { Schema } from "mongoose";

const DailyGemaSchema = new Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
    },
    claimDate: {
      type: Date,
      required: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { created_At: "created_At", updated_At: "updated_At" } }
);

const DailyGema = Mongoose.model("DailyGema", DailyGemaSchema);

export default DailyGema;
