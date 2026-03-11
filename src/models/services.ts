import { Schema, model } from "mongoose";
import { serviceSchemaType } from "./types";

const serviceSchema = new Schema(
  {
    companyId: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    sla: {
      firstResponseMins: {
        type: Number,
        default: null,
      },
      resolutionMins: {
        type: Number,
        default: null,
      },
    },
    channels: {
      type: [String],
      enum: ["chat", "email", "voice"],
      default: ["chat"],
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

export const ServiceModel = model<serviceSchemaType>("Service", serviceSchema);
