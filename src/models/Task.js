import Mongoose, { Schema } from "mongoose";
import rewards from "../enums/rewards";
import { taskCostType, taskType } from "../enums/taskType";
import userRanks from "../enums/userRanks";

const TaskSchema = new Schema(
  {
    ranks: {
      type: Array,
      enum: Object.values(userRanks),
    },
    taskCost: {
      type: Number,
    },
    GemaReward: {
      type: Number,
    },
    taskReward: {
      type: String,
      enum: Object.values(rewards),
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    taskCostType: {
      type: String,
      enum: Object.values(taskCostType),
    },
    taskType: {
      type: String,
      enum: Object.values(taskType),
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const Task = Mongoose.model("Task", TaskSchema);

export default Task;
