import { Schema, model } from "mongoose";
import { staffSchemaType } from "./types";

const staffSchema = new Schema(
  {
    companyId: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    roles: {
      type: [String],
      default: ["agent"],
    },
    status: {
      type: String,
      enum: ["invited", "active", "suspended"],
      default: "invited",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    invitedBy: {
      type: String,
      default: null,
    },
    invitedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

// Unique email per company/tenant
staffSchema.index({ companyId: 1, email: 1 }, { unique: true });

export const StaffModel = model<staffSchemaType>("Staff", staffSchema);
