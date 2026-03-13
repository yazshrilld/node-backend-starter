import type { RequestHandler } from "express";
import { HttpStatusCode } from "../config";
import { responseObject, CustomWinstonLogger } from "../utils";
import { widgetConfigService } from "../services/model";

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

const upsertWidgetConfig: RequestHandler = async (req, res) => {
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

    const createdOrUpdated = await widgetConfigService.createOrUpdateWidgetConfig(
      req.body,
    );

    statusCode = HttpStatusCode.OK;
    message = "Widget config saved successfully";
    payload = { widgetConfig: createdOrUpdated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error saving widget config: ${(err as Error).message}`,
      "Widget Config Upsert",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getWidgetConfig: RequestHandler = async (req, res) => {
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

    const companyId = String(req.params.companyId || req.query.companyId || "");
    const config = await widgetConfigService.getWidgetConfig(companyId);

    if (!config) {
      statusCode = HttpStatusCode.NotFound;
      message = "Widget config not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Widget config fetched successfully";
    payload = { widgetConfig: config };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error getting widget config: ${(err as Error).message}`,
      "Widget Config Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const regenerateWidgetToken: RequestHandler = async (req, res) => {
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

    const companyId = String(req.params.companyId || "");
    const updated = await widgetConfigService.regenerateWidgetToken(companyId);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Widget config not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Widget token regenerated successfully";
    payload = { widgetConfig: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error regenerating widget token: ${(err as Error).message}`,
      "Widget Token Regenerate",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchAllowedDomains: RequestHandler = async (req, res) => {
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

    const companyId = String(req.params.companyId || "");
    const allowedDomains = Array.isArray(req.body?.allowedDomains)
      ? req.body.allowedDomains
      : [];
    const updated = await widgetConfigService.updateAllowedDomains(
      companyId,
      allowedDomains,
    );

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Widget config not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Allowed domains updated successfully";
    payload = { widgetConfig: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating allowed domains: ${(err as Error).message}`,
      "Widget Allowed Domains Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchWidgetStatus: RequestHandler = async (req, res) => {
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

    const companyId = String(req.params.companyId || "");
    const widgetEnabled = Boolean(req.body?.widgetEnabled);
    const updated = await widgetConfigService.updateWidgetStatus(
      companyId,
      widgetEnabled,
    );

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Widget config not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Widget status updated successfully";
    payload = { widgetConfig: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating widget status: ${(err as Error).message}`,
      "Widget Status Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getPublicWidgetRuntimeConfig: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const companyId = String(req.params.companyId || req.query.companyId || "");
    const data = await widgetConfigService.getPublicWidgetRuntimeConfig(companyId);

    statusCode = HttpStatusCode.OK;
    message = "Widget runtime config fetched successfully";
    payload = data;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error getting public widget runtime config: ${(err as Error).message}`,
      "Widget Runtime Public Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

export default {
  upsertWidgetConfig,
  getWidgetConfig,
  regenerateWidgetToken,
  patchAllowedDomains,
  patchWidgetStatus,
  getPublicWidgetRuntimeConfig,
};
