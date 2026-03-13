import { Schema, model } from "mongoose";
import { analyticsSchemaType } from "./types";

const analyticsSchema = new Schema(
  {
    companyId: {
      type: String,
      required: false,
      trim: true,
      default: null,
      index: true,
    },
    period: {
      type: String,
      enum: ["day", "week", "month"],
      default: "day",
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    overview: {
      totalConversations: { type: Number, default: 0 },
      openTickets: { type: Number, default: 0 },
      resolvedTickets: { type: Number, default: 0 },
      activeStaff: { type: Number, default: 0 },
    },
    usage: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: Number, default: 0 },
        },
      ],
      default: [],
    },
    issues: {
      escalations: { type: Number, default: 0 },
      unresolvedBacklog: { type: Number, default: 0 },
      reopenRate: { type: Number, default: 0 },
    },
    responseTimes: {
      averageFirstResponseMins: { type: Number, default: 0 },
      averageResolutionMins: { type: Number, default: 0 },
    },
    satisfaction: {
      csatAverage: { type: Number, default: 0 },
      responsesCount: { type: Number, default: 0 },
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

analyticsSchema.index({ companyId: 1, period: 1, fromDate: 1, toDate: 1 });

export const AnalyticsModel = model<analyticsSchemaType>(
  "Analytics",
  analyticsSchema,
);
