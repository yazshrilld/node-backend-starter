import type { RequestHandler } from "express";
import { HttpStatusCode } from "../config";
import { responseObject, CustomWinstonLogger } from "../utils";
import { faqService } from "../services/model";

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

const createFaq: RequestHandler = async (req, res) => {
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

    const created = await faqService.createFaq(req.body);

    statusCode = HttpStatusCode.Created;
    message = "FAQ created successfully";
    payload = { faq: created };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error creating FAQ: ${(err as Error).message}`,
      "FAQ Create",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getFaqs: RequestHandler = async (req, res) => {
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

    const result = await faqService.listFaqs(req.query as any);

    statusCode = HttpStatusCode.OK;
    message = "FAQs fetched successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching FAQs: ${(err as Error).message}`,
      "FAQ Get All",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getFaqById: RequestHandler = async (req, res) => {
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

    const faqId = String(req.params.id || "");
    const faq = await faqService.getFaqById(faqId);

    if (!faq) {
      statusCode = HttpStatusCode.NotFound;
      message = "FAQ not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "FAQ fetched successfully";
    payload = { faq };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching FAQ by id: ${(err as Error).message}`,
      "FAQ Get One",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const patchFaq: RequestHandler = async (req, res) => {
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

    const faqId = String(req.params.id || "");
    const updated = await faqService.updateFaq(faqId, req.body);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "FAQ not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "FAQ updated successfully";
    payload = { faq: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error updating FAQ: ${(err as Error).message}`,
      "FAQ Patch",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const deleteFaq: RequestHandler = async (req, res) => {
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

    const faqId = String(req.params.id || "");
    const deleted = await faqService.deleteFaq(faqId);

    if (!deleted) {
      statusCode = HttpStatusCode.NotFound;
      message = "FAQ not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = "FAQ deleted successfully";
    payload = { faq: deleted };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error deleting FAQ: ${(err as Error).message}`,
      "FAQ Delete",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const publishFaq: RequestHandler = async (req, res) => {
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

    const faqId = String(req.params.id || "");
    const isPublished = Boolean(req.body?.isPublished);
    const updated = await faqService.publishFaq(faqId, isPublished);

    if (!updated) {
      statusCode = HttpStatusCode.NotFound;
      message = "FAQ not found";
      return responseObject({ res, statusCode, message, payload });
    }

    statusCode = HttpStatusCode.OK;
    message = `FAQ ${isPublished ? "published" : "unpublished"} successfully`;
    payload = { faq: updated };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error publishing FAQ: ${(err as Error).message}`,
      "FAQ Publish",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const reorderFaqs: RequestHandler = async (req, res) => {
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
    const result = await faqService.reorderFaqs(items);

    statusCode = HttpStatusCode.OK;
    message = "FAQs reordered successfully";
    payload = result;
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error reordering FAQs: ${(err as Error).message}`,
      "FAQ Reorder",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

const getPublicFaqs: RequestHandler = async (req, res) => {
  let statusCode = HttpStatusCode.ServiceUnavailable;
  let message = "A critical error occured. Kindly contact admin";
  let payload: unknown = null;

  try {
    const faqs = await faqService.listPublicFaqs(req.query as any);

    statusCode = HttpStatusCode.OK;
    message = "Public FAQs fetched successfully";
    payload = { data: faqs };
  } catch (err) {
    CustomWinstonLogger(
      "error",
      `Error fetching public FAQs: ${(err as Error).message}`,
      "FAQ Public Get",
    );
    message = (err as Error).message;
  }

  return responseObject({ res, statusCode, message, payload });
};

export default {
  createFaq,
  getFaqs,
  getFaqById,
  patchFaq,
  deleteFaq,
  publishFaq,
  reorderFaqs,
  getPublicFaqs,
};
