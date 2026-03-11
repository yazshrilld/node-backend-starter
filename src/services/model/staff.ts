import { staffModel } from "../../models";
import { staffSchemaType } from "../../models/types";

const { StaffModel } = staffModel;

type GetStaffQuery = {
  page?: number | string;
  size?: number | string;
  limit?: number | string;
  gSearch?: string;
  search?: string;
  status?: string;
  companyId?: string;
  role?: string;
};

export type CreateStaffPayload = {
  companyId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roles?: string[];
  status?: "invited" | "active" | "suspended";
  isActive?: boolean;
  invitedBy?: string;
  invitedAt?: Date;
};

type UpdateStaffPayload = Partial<CreateStaffPayload>;

const STAFF_ROLES = ["super_admin", "admin", "supervisor", "agent"];
const STAFF_PERMISSIONS = [
  "staff:create",
  "staff:read",
  "staff:update",
  "staff:delete",
  "staff:assign_roles",
  "staff:change_status",
];

const getPagination = (query: GetStaffQuery) => {
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

export const createStaff = async (
  payload: CreateStaffPayload,
): Promise<staffSchemaType> => {
  return await StaffModel.create(payload);
};

export const listStaff = async (query: GetStaffQuery) => {
  const { page, limit, skip } = getPagination(query);
  const search = String(query.search || query.gSearch || "").trim();

  const filter: Record<string, unknown> = {};

  if (query.companyId) filter.companyId = query.companyId;
  if (query.status) filter.status = query.status;
  if (query.role) filter.roles = { $in: [query.role] };

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const [rows, total] = await Promise.all([
    StaffModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    StaffModel.countDocuments(filter),
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

export const getStaffById = async (
  id: string,
): Promise<staffSchemaType | null> => {
  return await StaffModel.findById(id);
};

export const updateStaff = async (
  id: string,
  payload: UpdateStaffPayload,
): Promise<staffSchemaType | null> => {
  const allowedFields = [
    "companyId",
    "firstName",
    "lastName",
    "email",
    "phone",
    "roles",
    "status",
    "isActive",
    "invitedBy",
    "invitedAt",
  ];

  const updatePayload: Record<string, unknown> = {};
  Object.keys(payload || {}).forEach((key) => {
    if (allowedFields.includes(key)) {
      updatePayload[key] = (payload as Record<string, unknown>)[key];
    }
  });

  return await StaffModel.findByIdAndUpdate(id, updatePayload, { new: true });
};

export const deleteStaff = async (
  id: string,
): Promise<staffSchemaType | null> => {
  return await StaffModel.findByIdAndDelete(id);
};

export const updateStaffStatus = async (
  id: string,
  status: "invited" | "active" | "suspended",
): Promise<staffSchemaType | null> => {
  return await StaffModel.findByIdAndUpdate(id, { status }, { new: true });
};

export const updateStaffRoles = async (
  id: string,
  roles: string[],
): Promise<staffSchemaType | null> => {
  return await StaffModel.findByIdAndUpdate(id, { roles }, { new: true });
};

export const resendStaffInvite = async (
  id: string,
  invitedBy?: string,
): Promise<staffSchemaType | null> => {
  return await StaffModel.findByIdAndUpdate(
    id,
    {
      status: "invited",
      invitedAt: new Date(),
      ...(invitedBy ? { invitedBy } : {}),
    },
    { new: true },
  );
};

export const getStaffRoles = async (): Promise<string[]> => {
  return STAFF_ROLES;
};

export const getStaffPermissions = async (): Promise<string[]> => {
  return STAFF_PERMISSIONS;
};

export default {
  createStaff,
  listStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updateStaffStatus,
  updateStaffRoles,
  resendStaffInvite,
  getStaffRoles,
  getStaffPermissions,
};
