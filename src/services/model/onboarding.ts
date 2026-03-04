import { onboardingModel } from "../../models";
import { onboardingSchemaType } from "../../models/types";

const { OnboardingModel } = onboardingModel;

type GetOnboardingQuery = {
  page?: number | string;
  size?: number | string;
  limit?: number | string;
  gSearch?: string;
  search?: string;
};

export type CreateOnboardingPayload = {
  companyName: string;
  websiteUrl?: string;
  industryCategory: string;
  companySizeOrRole: string;
  brandColors: {
    primary: string;
    secondary?: string;
  };
  widgetPosition: "bottom-right" | "bottom-left";
  agentPersona: {
    alias: string;
    profileImageUrl?: string;
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

type UpdateOnboardingPayload = Partial<CreateOnboardingPayload>;

const getPagination = (query: GetOnboardingQuery) => {
  const page = Number(query.page || 1);
  const rawLimit = Number(query.limit || query.size || 10);

  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safeLimit =
    Number.isNaN(rawLimit) || rawLimit < 1 ? 10 : Math.min(rawLimit, 100);

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
  };
};

export const createOnboarding = async (
  payload: CreateOnboardingPayload,
): Promise<onboardingSchemaType> => {
  return await OnboardingModel.create(payload);
};

export const listOnboardings = async (query: GetOnboardingQuery) => {
  const { page, limit, skip } = getPagination(query);
  const search = String(query.search || query.gSearch || "").trim();

  const searchFilter = search
    ? {
      $or: [
        { companyName: { $regex: search, $options: "i" } },
        { websiteUrl: { $regex: search, $options: "i" } },
        { industryCategory: { $regex: search, $options: "i" } },
        { companySizeOrRole: { $regex: search, $options: "i" } },
        { "agentPersona.alias": { $regex: search, $options: "i" } },
      ],
    }
    : {};

  const filter = {
    $and: [searchFilter],
  };

  const [rows, total] = await Promise.all([
    OnboardingModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    OnboardingModel.countDocuments(filter),
  ]);

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};


export const getOnboardingById = async (
  id: string,
): Promise<onboardingSchemaType | null> => {
  return await OnboardingModel.findById(id);
};

export const updateOnboarding = async (
  id: string,
  payload: UpdateOnboardingPayload,
): Promise<onboardingSchemaType | null> => {
  const allowedFields = [
    "companyName",
    "websiteUrl",
    "industryCategory",
    "companySizeOrRole",
    "brandColors",
    "widgetPosition",
    "agentPersona",
    "hoursOfOperation",
    "languagePreferences",
    "preChatFormFields",
    "knowledgeBaseData",
  ];

  const updatePayload: Record<string, unknown> = {};
  Object.keys(payload || {}).forEach((key) => {
    if (allowedFields.includes(key)) {
      updatePayload[key] = (payload as Record<string, unknown>)[key];
    }
  });

  return await OnboardingModel.findByIdAndUpdate(id, updatePayload, {
    new: true,
  });
};

export const deleteOnboarding = async (
  id: string,
): Promise<onboardingSchemaType | null> => {
  return await OnboardingModel.findByIdAndDelete(id);
};

export default {
  createOnboarding,
  listOnboardings,
  getOnboardingById,
  updateOnboarding,
  deleteOnboarding,
};
