import { Schema, model } from "mongoose";
import { widgetConfigSchemaType } from "./types";

const widgetConfigSchema = new Schema(
  {
    companyId: {
      type: String,
      required: false,
      trim: true,
      default: null,
      index: true,
    },
    widgetEnabled: {
      type: Boolean,
      default: true,
    },
    allowedDomains: {
      type: [String],
      default: [],
    },
    widgetToken: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    tokenLastRotatedAt: {
      type: Date,
      default: null,
    },
    security: {
      requireOriginCheck: {
        type: Boolean,
        default: true,
      },
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

widgetConfigSchema.index({ companyId: 1 }, { unique: true });

export const WidgetConfigModel = model<widgetConfigSchemaType>(
  "WidgetConfig",
  widgetConfigSchema,
);
