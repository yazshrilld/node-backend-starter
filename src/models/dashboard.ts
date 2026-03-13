import { Schema, model } from "mongoose";
import { dashboardSchemaType } from "./types";

const dashboardSchema = new Schema(
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
    summary: {
      totalConversations: { type: Number, default: 0 },
      openTickets: { type: Number, default: 0 },
      resolvedTickets: { type: Number, default: 0 },
      activeStaff: { type: Number, default: 0 },
    },
    activityFeed: {
      type: [
        {
          type: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            default: "",
          },
          actor: {
            type: String,
            default: "",
          },
          createdAt: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
    alerts: {
      type: [
        {
          level: {
            type: String,
            enum: ["info", "warning", "critical"],
            default: "info",
          },
          code: {
            type: String,
            default: "",
          },
          message: {
            type: String,
            required: true,
          },
          isActive: {
            type: Boolean,
            default: true,
          },
          createdAt: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
    health: {
      status: {
        type: String,
        enum: ["healthy", "degraded", "down"],
        default: "healthy",
      },
      modules: {
        auth: { type: String, default: "healthy" },
        onboarding: { type: String, default: "healthy" },
        faqs: { type: String, default: "healthy" },
        services: { type: String, default: "healthy" },
        staff: { type: String, default: "healthy" },
        analytics: { type: String, default: "healthy" },
      },
      lastCheckedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

dashboardSchema.index({ companyId: 1, period: 1, fromDate: 1, toDate: 1 });

export const DashboardModel = model<dashboardSchemaType>(
  "Dashboard",
  dashboardSchema,
);
