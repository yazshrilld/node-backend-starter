import { faqModel } from "../../models";
import { faqSchemaType } from "../../models/types";
import { Types } from "mongoose";


const { FaqModel } = faqModel;

type GetFaqsQuery = {
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

export type CreateFaqPayload = {
  companyId?: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  sortOrder?: number;
  isPublished?: boolean;
  isActive?: boolean;
};

type UpdateFaqPayload = Partial<CreateFaqPayload>;

type ReorderFaqItem = {
  id: string;
  sortOrder: number;
};

const getPagination = (query: GetFaqsQuery) => {
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

export const createFaq = async (
  payload: CreateFaqPayload,
): Promise<faqSchemaType> => {
  return await FaqModel.create(payload);
};

export const listFaqs = async (query: GetFaqsQuery) => {
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
      { question: { $regex: search, $options: "i" } },
      { answer: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { tags: { $elemMatch: { $regex: search, $options: "i" } } },
    ];
  }

  const [rows, total] = await Promise.all([
    FaqModel.find(filter).sort({ sortOrder: 1, createdAt: -1 }).skip(skip).limit(limit),
    FaqModel.countDocuments(filter),
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

export const listPublicFaqs = async (query: GetFaqsQuery) => {
  const filter: Record<string, unknown> = {
    isPublished: true,
    isActive: true,
  };

  if (query.companyId) filter.companyId = query.companyId;
  if (query.category) filter.category = String(query.category).toLowerCase();

  return await FaqModel.find(filter)
    .sort({ sortOrder: 1, createdAt: -1 })
    .select("-__v");
};

export const getFaqById = async (
  id: string,
): Promise<faqSchemaType | null> => {
  return await FaqModel.findById(id);
};

export const updateFaq = async (
  id: string,
  payload: UpdateFaqPayload,
): Promise<faqSchemaType | null> => {
  const allowedFields = [
    "companyId",
    "question",
    "answer",
    "category",
    "tags",
    "sortOrder",
    "isPublished",
    "isActive",
  ];

  const updatePayload: Record<string, unknown> = {};
  Object.keys(payload || {}).forEach((key) => {
    if (allowedFields.includes(key)) {
      updatePayload[key] = (payload as Record<string, unknown>)[key];
    }
  });

  return await FaqModel.findByIdAndUpdate(id, updatePayload, { new: true });
};

export const deleteFaq = async (id: string): Promise<faqSchemaType | null> => {
  return await FaqModel.findByIdAndDelete(id);
};

export const publishFaq = async (
  id: string,
  isPublished: boolean,
): Promise<faqSchemaType | null> => {
  return await FaqModel.findByIdAndUpdate(id, { isPublished }, { new: true });
};

export const reorderFaqs = async (
  items: ReorderFaqItem[],
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

  const result = await FaqModel.bulkWrite(operations as any);
  return { updatedCount: result.modifiedCount || 0 };
};


export default {
  createFaq,
  listFaqs,
  listPublicFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
  publishFaq,
  reorderFaqs,
};
