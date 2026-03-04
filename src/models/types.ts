import { Helpers } from "../types";
import { Document } from "mongoose";

export type FindInfoParams = {
  orderBy?: string;
  sort?: "ASC" | "DESC";
  size?: number;
  page?: number;
  gSearch?: string;
  filter?: Record<string, any>;
  status?: string;
  option?: string;
  startDate?: string;
  endDate?: string;
};

export type usersSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    companyId?: string;
    name?: string;
    picture?: string;
    address?: string;
    country?: string;
    role: string;
    roles?: string[];
    lastLogin?: Date;
    isActive?: boolean;
  };

export type sessionSchemaType = Document &
  Helpers.Timestamps & {
    attachmentId: string;
    conversationId: string;
    businessId: string;
    messageId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    mimeType: string;
    storageProvider: string;
    storagePath: string;
    publicUrl: string | null;
    uploadedBy: string;
    uploadedByType: string;
    scanStatus: string;
  };

export type onboardingSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    companyName: string;
    websiteUrl?: string | null;
    industryCategory: string;
    companySizeOrRole: string;
    brandColors: {
      primary: string;
      secondary?: string | null;
    };
    widgetPosition: "bottom-right" | "bottom-left";
    agentPersona: {
      alias: string;
      profileImageUrl?: string | null;
    };
    hoursOfOperation: {
      timezone: string;
      schedule: Array<{
        day: string;
        start: string;
        end: string;
        isOpen: boolean;
      }>;
    };
    languagePreferences: {
      defaultLanguage: string;
      supportedLanguages: string[];
    };
    preChatFormFields: Array<{
      key: string;
      label: string;
      type: string;
      required: boolean;
      options?: string[];
    }>;
    knowledgeBaseData: {
      urls: string[];
      documents: string[];
    };
  };
