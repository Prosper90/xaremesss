import Mongoose, { Schema } from "mongoose";

const GemaSchema = new Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    gemaScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const GemaScores = Mongoose.model("GemaScores", GemaSchema);

export default GemaScores;
