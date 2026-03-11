import type { RequestHandler } from "express";
import { HttpStatusCode } from "../config";
import { responseObject, CustomWinstonLogger } from "../utils";
import { staffService } from "../services/model";

const parseRoles = (roles: unknown): string[] => {
  if (Array.isArray(roles)) return roles;
  if (typeof roles === "string") {
    try {
      const parsed = JSON.parse(roles);
      return Array.isArray(parsed) ? parsed : [roles];
    } catch {
      return [roles];
    }
  }
  return [];
};

const isAdminOrSuperAdmin = (roles: string[]) =>
  roles.includes("admin") || roles.includes("super_admin");

const createStaff: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const created = await staffService.createStaff(req.body);

    statusCode = HttpStatusCode.Created;
    message = "Staff created successfully";
    payload = { staff: created };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error creating staff: ${(err as Error).message}`,
      "Staff Create",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getStaffs: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const result = await staffService.listStaff(req.query as any);

    statusCode = HttpStatusCode.OK;
    message = "Staff fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching staffs: ${(err as Error).message}`,
      "Staff Get All",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getStaffById: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const staffId = String(req.params.id || "");
    const staff = await staffService.getStaffById(staffId);

    if (!staff) {
      statusCode = HttpStatusCode.NotFound;
      message = "Staff not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Staff fetched successfully";
    payload = { staff };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching staff by id: ${(err as Error).message}`,
      "Staff Get One",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchStaff: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const staffId = String(req.params.id || "");
    const updated = await staffService.updateStaff(staffId, req.body);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Staff not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Staff updated successfully";
    payload = { staff: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating staff: ${(err as Error).message}`,
      "Staff Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const deleteStaff: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const staffId = String(req.params.id || "");
    const deleted = await staffService.deleteStaff(staffId);

    if (!deleted) {
      statusCode = HttpStatusCode.NotFound;
      message = "Staff not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Staff deleted successfully";
    payload = { staff: deleted };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error deleting staff: ${(err as Error).message}`,
      "Staff Delete",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchStaffStatus: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const staffId = String(req.params.id || "");
    const updated = await staffService.updateStaffStatus(staffId, req.body.status);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Staff not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Staff status updated successfully";
    payload = { staff: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating staff status: ${(err as Error).message}`,
      "Staff Status Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchStaffRoles: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const staffId = String(req.params.id || "");
    const updated = await staffService.updateStaffRoles(staffId, req.body.roles);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Staff not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Staff roles updated successfully";
    payload = { staff: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating staff roles: ${(err as Error).message}`,
      "Staff Roles Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const resendInvite: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = parseRoles(req.USER_ROLES);
    if (!isAdminOrSuperAdmin(roles)) {
      statusCode = HttpStatusCode.Forbidden;
      message = "Access denied. Your role is not allowed here.";
      return responseObject({ res, statusCode, message, payload });
    }

    const staffId = String(req.params.id || "");
    const invitedBy =
      typeof req.USER_ID === "string" ? req.USER_ID : undefined;
    const updated = await staffService.resendStaffInvite(staffId, invitedBy);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Staff not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Invite resent successfully";
    payload = { staff: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error resending invite: ${(err as Error).message}`,
      "Staff Resend Invite",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getRoles: RequestHandler = async (_req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const roles = await staffService.getStaffRoles();
    statusCode = HttpStatusCode.OK;
    message = "Roles fetched successfully";
    payload = { data: roles };
  } catch (err) {
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getPermissions: RequestHandler = async (_req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const permissions = await staffService.getStaffPermissions();
    statusCode = HttpStatusCode.OK;
    message = "Permissions fetched successfully";
    payload = { data: permissions };
  } catch (err) {
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

export default {
  createStaff,
  getStaffs,
  getStaffById,
  patchStaff,
  deleteStaff,
  patchStaffStatus,
  patchStaffRoles,
  resendInvite,
  getRoles,
  getPermissions,
};
