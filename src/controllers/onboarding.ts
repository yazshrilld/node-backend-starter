import type { RequestHandler } from "express";
import { HttpStatusCode } from "../config";
import { responseObject, CustomWinstonLogger } from "../utils";
import { onboardingService } from "../services/model";

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

const createOnboarding: RequestHandler = async (req, res) => {
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

    const created = await onboardingService.createOnboarding(req.body);

    statusCode = HttpStatusCode.Created;
    message = "Onboarding created successfully";
    payload = { onboarding: created };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error creating onboarding: ${(err as Error).message}`,
      "Onboarding Create",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getOnboardings: RequestHandler = async (req, res) => {
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

    const result = await onboardingService.listOnboardings(req.query as any);

    statusCode = HttpStatusCode.OK;
    message = "Onboardings fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching onboardings: ${(err as Error).message}`,
      "Onboarding Get All",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getOnboardingById: RequestHandler = async (req, res) => {
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

    const onboardingId = String(req.params.id || "");
    const onboarding = await onboardingService.getOnboardingById(onboardingId);

    if (!onboarding) {
      statusCode = HttpStatusCode.NotFound;
      message = "Onboarding not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Onboarding fetched successfully";
    payload = { onboarding };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching onboarding by id: ${(err as Error).message}`,
      "Onboarding Get One",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchOnboarding: RequestHandler = async (req, res) => {
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

    const onboardingId = String(req.params.id || "");
    const updated = await onboardingService.updateOnboarding(onboardingId, req.body);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Onboarding not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Onboarding updated successfully";
    payload = { onboarding: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating onboarding: ${(err as Error).message}`,
      "Onboarding Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const deleteOnboarding: RequestHandler = async (req, res) => {
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

    const onboardingId = String(req.params.id || "");
    const deleted = await onboardingService.deleteOnboarding(onboardingId);

    if (!deleted) {
      statusCode = HttpStatusCode.NotFound;
      message = "Onboarding not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Onboarding deleted successfully";
    payload = { onboarding: deleted };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error deleting onboarding: ${(err as Error).message}`,
      "Onboarding Delete",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

export default {
  createOnboarding,
  getOnboardings,
  getOnboardingById,
  patchOnboarding,
  deleteOnboarding,
};
