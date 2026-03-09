import { Schema, model } from "mongoose";
import { faqSchemaType } from "./types";

const faqSchema = new Schema(
  {
    companyId: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
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
    sortOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

export const FaqModel = model<faqSchemaType>("Faq", faqSchema);
