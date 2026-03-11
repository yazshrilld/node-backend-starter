import { serviceModel } from "../../models";
import { serviceSchemaType } from "../../models/types";
import { Types } from "mongoose";

const { ServiceModel } = serviceModel;

type GetServicesQuery = {
  page?: number | string;
  size?: number | string;
  limit?: number | string;
  gSearch?: string;
  search?: string;
  category?: string;
  isPublished?: string | boolean;
  isActive?: string | boolean;
  companyId?: string;
};

export type CreateServicePayload = {
  companyId?: string;
  name: string;
  description?: string;
  category?: string;
  tags?: string[];
  isPublished?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  sla?: {
    firstResponseMins?: number;
    resolutionMins?: number;
  };
  channels?: Array<"chat" | "email" | "voice">;
  metadata?: Record<string, any>;
};

type UpdateServicePayload = Partial<CreateServicePayload>;

type ReorderServiceItem = {
  id: string;
  sortOrder: number;
};

const getPagination = (query: GetServicesQuery) => {
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

const toBoolean = (value: unknown): boolean | undefined => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return undefined;
};

export const createService = async (
  payload: CreateServicePayload,
): Promise<serviceSchemaType> => {
  return await ServiceModel.create(payload);
};

export const listServices = async (query: GetServicesQuery) => {
  const { page, limit, skip } = getPagination(query);
  const search = String(query.search || query.gSearch || "").trim();

  const published = toBoolean(query.isPublished);
  const active = toBoolean(query.isActive);

  const filter: Record<string, unknown> = {};

  if (query.companyId) filter.companyId = query.companyId;
  if (query.category) filter.category = String(query.category).toLowerCase();
  if (published !== undefined) filter.isPublished = published;
  if (active !== undefined) filter.isActive = active;

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { tags: { $elemMatch: { $regex: search, $options: "i" } } },
    ];
  }

  const [rows, total] = await Promise.all([
    ServiceModel.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    ServiceModel.countDocuments(filter),
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

export const listPublicServices = async (query: GetServicesQuery) => {
  const filter: Record<string, unknown> = {
    isPublished: true,
    isActive: true,
  };

  if (query.companyId) filter.companyId = query.companyId;
  if (query.category) filter.category = String(query.category).toLowerCase();

  return await ServiceModel.find(filter)
    .sort({ sortOrder: 1, createdAt: -1 })
    .select("-__v");
};

export const getServiceById = async (
  id: string,
): Promise<serviceSchemaType | null> => {
  return await ServiceModel.findById(id);
};

export const updateService = async (
  id: string,
  payload: UpdateServicePayload,
): Promise<serviceSchemaType | null> => {
  const allowedFields = [
    "companyId",
    "name",
    "description",
    "category",
    "tags",
    "isPublished",
    "isActive",
    "sortOrder",
    "sla",
    "channels",
    "metadata",
  ];

  const updatePayload: Record<string, unknown> = {};
  Object.keys(payload || {}).forEach((key) => {
    if (allowedFields.includes(key)) {
      updatePayload[key] = (payload as Record<string, unknown>)[key];
    }
  });

  return await ServiceModel.findByIdAndUpdate(id, updatePayload, { new: true });
};

export const deleteService = async (
  id: string,
): Promise<serviceSchemaType | null> => {
  return await ServiceModel.findByIdAndDelete(id);
};

export const publishService = async (
  id: string,
  isPublished: boolean,
): Promise<serviceSchemaType | null> => {
  return await ServiceModel.findByIdAndUpdate(id, { isPublished }, { new: true });
};

export const reorderServices = async (
  items: ReorderServiceItem[],
): Promise<{ updatedCount: number }> => {
  if (!Array.isArray(items) || items.length === 0) {
    return { updatedCount: 0 };
  }

  const operations = items
    .filter((item) => Types.ObjectId.isValid(item.id))
    .map((item) => ({
      updateOne: {
        filter: { _id: new Types.ObjectId(item.id) },
        update: { $set: { sortOrder: item.sortOrder } },
      },
    }));

  if (operations.length === 0) {
    return { updatedCount: 0 };
  }

  const result = await ServiceModel.bulkWrite(operations as any);
  return { updatedCount: result.modifiedCount || 0 };
};

export default {
  createService,
  listServices,
  listPublicServices,
  getServiceById,
  updateService,
  deleteService,
  publishService,
  reorderServices,
};
