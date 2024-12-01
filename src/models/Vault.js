import mongoose, { Schema } from "mongoose";

const VaultSchema = new Schema(
  {
    valueName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    achievements: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Vault = mongoose.model("Vault", VaultSchema);

export default Vault;
