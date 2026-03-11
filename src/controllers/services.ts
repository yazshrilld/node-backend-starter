import type { RequestHandler } from "express";
import { HttpStatusCode } from "../config";
import { responseObject, CustomWinstonLogger } from "../utils";
import { serviceService } from "../services/model";

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

const createService: RequestHandler = async (req, res) => {
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

    const created = await serviceService.createService(req.body);

    statusCode = HttpStatusCode.Created;
    message = "Service created successfully";
    payload = { service: created };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error creating service: ${(err as Error).message}`,
      "Service Create",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getServices: RequestHandler = async (req, res) => {
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

    const result = await serviceService.listServices(req.query as any);

    statusCode = HttpStatusCode.OK;
    message = "Services fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching services: ${(err as Error).message}`,
      "Service Get All",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getServiceById: RequestHandler = async (req, res) => {
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

    const serviceId = String(req.params.id || "");
    const service = await serviceService.getServiceById(serviceId);

    if (!service) {
      statusCode = HttpStatusCode.NotFound;
      message = "Service not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Service fetched successfully";
    payload = { service };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching service by id: ${(err as Error).message}`,
      "Service Get One",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchService: RequestHandler = async (req, res) => {
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

    const serviceId = String(req.params.id || "");
    const updated = await serviceService.updateService(serviceId, req.body);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Service not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Service updated successfully";
    payload = { service: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating service: ${(err as Error).message}`,
      "Service Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const deleteService: RequestHandler = async (req, res) => {
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

    const serviceId = String(req.params.id || "");
    const deleted = await serviceService.deleteService(serviceId);

    if (!deleted) {
      statusCode = HttpStatusCode.NotFound;
      message = "Service not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "Service deleted successfully";
    payload = { service: deleted };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error deleting service: ${(err as Error).message}`,
      "Service Delete",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const publishService: RequestHandler = async (req, res) => {
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

    const serviceId = String(req.params.id || "");
    const isPublished = Boolean(req.body?.isPublished);
    const updated = await serviceService.publishService(serviceId, isPublished);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "Service not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = `Service ${isPublished ? "published" : "unpublished"} successfully`;
    payload = { service: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error publishing service: ${(err as Error).message}`,
      "Service Publish",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const reorderServices: RequestHandler = async (req, res) => {
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

    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    const result = await serviceService.reorderServices(items);

    statusCode = HttpStatusCode.OK;
    message = "Services reordered successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error reordering services: ${(err as Error).message}`,
      "Service Reorder",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getPublicServices: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const services = await serviceService.listPublicServices(req.query as any);

    statusCode = HttpStatusCode.OK;
    message = "Public services fetched successfully";
    payload = { data: services };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching public services: ${(err as Error).message}`,
      "Service Public Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

export default {
  createService,
  getServices,
  getServiceById,
  patchService,
  deleteService,
  publishService,
  reorderServices,
  getPublicServices,
};
