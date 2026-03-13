import crypto from "crypto";
import { widgetConfigModel, onboardingModel, faqModel, serviceModel } from "../../models";
import { widgetConfigSchemaType } from "../../models/types";

const { WidgetConfigModel } = widgetConfigModel;
const { OnboardingModel } = onboardingModel;
const { FaqModel } = faqModel;
const { ServiceModel } = serviceModel;

export type CreateOrUpdateWidgetConfigPayload = {
  companyId?: string;
  widgetEnabled?: boolean;
  allowedDomains?: string[];
  security?: {
    requireOriginCheck?: boolean;
  };
  metadata?: Record<string, any>;
};

const generateWidgetToken = () => {
  return crypto.randomBytes(24).toString("hex");
};

export const createOrUpdateWidgetConfig = async (
  payload: CreateOrUpdateWidgetConfigPayload,
): Promise<widgetConfigSchemaType> => {
  const companyId = payload.companyId || null;
  if (!companyId) {
    throw new Error("companyId is required");
  }

  const existing = await WidgetConfigModel.findOne({ companyId });

  if (!existing) {
    return await WidgetConfigModel.create({
      companyId,
      widgetEnabled: payload.widgetEnabled ?? true,
      allowedDomains: payload.allowedDomains ?? [],
      widgetToken: generateWidgetToken(),
      tokenLastRotatedAt: null,
      security: {
        requireOriginCheck: payload.security?.requireOriginCheck ?? true,
      },
      metadata: payload.metadata ?? null,
    });
  }

  const updatePayload: Record<string, unknown> = {};
  if (typeof payload.widgetEnabled === "boolean") {
    updatePayload.widgetEnabled = payload.widgetEnabled;
  }
  if (Array.isArray(payload.allowedDomains)) {
    updatePayload.allowedDomains = payload.allowedDomains;
  }
  if (payload.security) {
    updatePayload.security = {
      requireOriginCheck:
        payload.security.requireOriginCheck ??
        existing.security?.requireOriginCheck ??
        true,
    };
  }
  if (payload.metadata !== undefined) {
    updatePayload.metadata = payload.metadata;
  }

  return (await WidgetConfigModel.findOneAndUpdate(
    { companyId },
    updatePayload,
    { new: true },
  )) as widgetConfigSchemaType;
};

export const getWidgetConfig = async (
  companyId: string,
): Promise<widgetConfigSchemaType | null> => {
  return await WidgetConfigModel.findOne({ companyId });
};

export const regenerateWidgetToken = async (
  companyId: string,
): Promise<widgetConfigSchemaType | null> => {
  return await WidgetConfigModel.findOneAndUpdate(
    { companyId },
    {
      widgetToken: generateWidgetToken(),
      tokenLastRotatedAt: new Date(),
    },
    { new: true },
  );
};

export const updateAllowedDomains = async (
  companyId: string,
  allowedDomains: string[],
): Promise<widgetConfigSchemaType | null> => {
  return await WidgetConfigModel.findOneAndUpdate(
    { companyId },
    { allowedDomains },
    { new: true },
  );
};

export const updateWidgetStatus = async (
  companyId: string,
  widgetEnabled: boolean,
): Promise<widgetConfigSchemaType | null> => {
  return await WidgetConfigModel.findOneAndUpdate(
    { companyId },
    { widgetEnabled },
    { new: true },
  );
};

export const getPublicWidgetRuntimeConfig = async (companyId: string) => {
  const [widgetConfig, onboarding, faqs, services] = await Promise.all([
    WidgetConfigModel.findOne({ companyId }).select(
      "companyId widgetEnabled allowedDomains security",
    ),
    OnboardingModel.findOne({ companyId }),
    FaqModel.find({ companyId, isPublished: true, isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("question answer category tags sortOrder"),
    ServiceModel.find({ companyId, isPublished: true, isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("name description category tags sortOrder channels"),
  ]);

  return {
    widget: widgetConfig,
    onboarding,
    faqs,
    services,
  };
};

export default {
  createOrUpdateWidgetConfig,
  getWidgetConfig,
  regenerateWidgetToken,
  updateAllowedDomains,
  updateWidgetStatus,
  getPublicWidgetRuntimeConfig,
};
