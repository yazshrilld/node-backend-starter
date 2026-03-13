import type { RequestHandler } from "express";
import { HttpStatusCode } from "../config";
import { responseObject, CustomWinstonLogger } from "../utils";
import { dashboardService } from "../services/model";

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

const getSummary: RequestHandler = async (req, res) => {
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

    const result = await dashboardService.getSummary(req.query as any);
    statusCode = HttpStatusCode.OK;
    message = "Dashboard summary fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching dashboard summary: ${(err as Error).message}`,
      "Dashboard Summary Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getActivityFeed: RequestHandler = async (req, res) => {
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

    const result = await dashboardService.getActivityFeed(req.query as any);
    statusCode = HttpStatusCode.OK;
    message = "Dashboard activity feed fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching dashboard activity feed: ${(err as Error).message}`,
      "Dashboard ActivityFeed Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getAlerts: RequestHandler = async (req, res) => {
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

    const result = await dashboardService.getAlerts(req.query as any);
    statusCode = HttpStatusCode.OK;
    message = "Dashboard alerts fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching dashboard alerts: ${(err as Error).message}`,
      "Dashboard Alerts Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getHealth: RequestHandler = async (req, res) => {
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

    const result = await dashboardService.getHealth(req.query as any);
    statusCode = HttpStatusCode.OK;
    message = "Dashboard health fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching dashboard health: ${(err as Error).message}`,
      "Dashboard Health Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

export default {
  getSummary,
  getActivityFeed,
  getAlerts,
  getHealth,
};
