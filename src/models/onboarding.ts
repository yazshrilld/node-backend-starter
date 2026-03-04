import { Schema, model } from "mongoose";
import { onboardingSchemaType } from "./types";

const onboardingSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
      default: null,
    },
    industryCategory: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    companySizeOrRole: {
      type: String,
      required: true,
      trim: true,
    },

    brandColors: {
      primary: {
        type: String,
        required: true,
        trim: true,
      },
      secondary: {
        type: String,
        trim: true,
        default: null,
      },
    },

    widgetPosition: {
      type: String,
      required: true,
      enum: ["bottom-right", "bottom-left"],
      default: "bottom-right",
    },

    agentPersona: {
      alias: {
        type: String,
        required: true,
        trim: true,
      },
      profileImageUrl: {
        type: String,
        trim: true,
        default: null,
      },
    },

    hoursOfOperation: {
      timezone: {
        type: String,
        required: true,
        trim: true,
      },
      schedule: [
        {
          day: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
          },
          start: {
            type: String,
            required: true,
            trim: true,
          },
          end: {
            type: String,
            required: true,
            trim: true,
          },
          isOpen: {
            type: Boolean,
            default: true,
          },
        },
      ],
    },

    languagePreferences: {
      defaultLanguage: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      supportedLanguages: {
        type: [String],
        default: ["en"],
      },
    },

    preChatFormFields: [
      {
        key: {
          type: String,
          required: true,
          trim: true,
        },
        label: {
          type: String,
          required: true,
          trim: true,
        },
        type: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
        required: {
          type: Boolean,
          default: false,
        },
        options: {
          type: [String],
          default: [],
        },
      },
    ],

    knowledgeBaseData: {
      urls: {
        type: [String],
        default: [],
      },
      documents: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

export const OnboardingModel = model<onboardingSchemaType>(
  "Onboarding",
  onboardingSchema,
);
