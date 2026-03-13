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

export type faqSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    companyId?: string | null;
    question: string;
    answer: string;
    category?: string | null;
    tags: string[];
    sortOrder: number;
    isPublished: boolean;
    isActive: boolean;
  };

export type serviceSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    companyId?: string | null;
    name: string;
    description?: string | null;
    category?: string | null;
    tags: string[];
    isPublished: boolean;
    isActive: boolean;
    sortOrder: number;
    sla?: {
      firstResponseMins?: number | null;
      resolutionMins?: number | null;
    };
    channels: ("chat" | "email" | "voice")[];
    metadata?: Record<string, any> | null;
  };

export type staffSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    companyId?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    roles: string[];
    status: "invited" | "active" | "suspended";
    isActive: boolean;
    lastLogin?: Date | null;
    invitedBy?: string | null;
    invitedAt?: Date | null;
  };

export type widgetConfigSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    companyId?: string | null;
    widgetEnabled: boolean;
    allowedDomains: string[];
    widgetToken: string;
    tokenLastRotatedAt?: Date | null;
    security?: {
      requireOriginCheck?: boolean;
    };
    metadata?: Record<string, any> | null;
  };

export type analyticsSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    companyId?: string | null;
    period: "day" | "week" | "month";
    fromDate: Date;
    toDate: Date;
    overview: {
      totalConversations: number;
      openTickets: number;
      resolvedTickets: number;
      activeStaff: number;
    };
    usage: Array<{
      label: string;
      value: number;
    }>;
    issues: {
      escalations: number;
      unresolvedBacklog: number;
      reopenRate: number;
    };
    responseTimes: {
      averageFirstResponseMins: number;
      averageResolutionMins: number;
    };
    satisfaction: {
      csatAverage: number;
      responsesCount: number;
    };
  };

export type dashboardSchemaType = Document &
  Helpers.Timestamps & {
    _id?: string;
    companyId?: string | null;
    period: "day" | "week" | "month";
    fromDate: Date;
    toDate: Date;
    summary: {
      totalConversations: number;
      openTickets: number;
      resolvedTickets: number;
      activeStaff: number;
    };
    activityFeed: Array<{
      type: string;
      title: string;
      description?: string;
      actor?: string;
      createdAt: Date;
    }>;
    alerts: Array<{
      level: "info" | "warning" | "critical";
      code?: string;
      message: string;
      isActive: boolean;
      createdAt: Date;
    }>;
    health: {
      status: "healthy" | "degraded" | "down";
      modules: {
        auth: string;
        onboarding: string;
        faqs: string;
        services: string;
        staff: string;
        analytics: string;
      };
      lastCheckedAt: Date;
    };
  };






