import { getters } from "../config";
import {
  costomencryDecryptInternalCRYPTOJS,
  createHttpError,
  CustomWinstonLogger,
  errorHandler,
  responseObject,
} from "../utils";
import { Request, Response, NextFunction } from "express";
import moment from "moment";

const decryptRequestMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Always allow preflight requests
    if (req.method.toUpperCase() === "OPTIONS") {
      return next();
    }

    const shouldDecrypt = shouldEncryptResponse(req, res);
    const swaggerRequest = isSwaggerRequest(req);
    const requiresEncryptedBody =
      !swaggerRequest && isEncryptedBodyRequired(req);

    // Skip if route excluded or no encrypted payload
    if (!shouldDecrypt || !req.body?.textData) {
      if (requiresEncryptedBody) {
        return responseObject({
          res,
          statusCode: 400,
          message: "Encrypted request body (textData) is required.",
          payload: null,
        });
      }
      res.locals.shouldEncrypt = false;
      return next();
    }
    const stringData = req.body.textData;
    let logPayload = null;
    const defaultErrorMessage = "Fatal error occurred during decryption";

    try {
      if (typeof stringData !== "string" || stringData.trim() === "") {
        throw createHttpError(
          "Invalid 'textData': must be a non-empty string.",
          400,
        );
      }

      const decryptResult = await costomencryDecryptInternalCRYPTOJS(
        "DE",
        stringData,
        getters.getAppSecrets().aesSecertKey,
        getters.getAppSecrets().aesSecertIvKey,
      );

      if (!decryptResult.status) {
        throw createHttpError(decryptResult.payload || "Decryption failed", 422);
      }

      if (!decryptResult.payload || typeof decryptResult.payload !== "object") {
        throw createHttpError("Invalid decrypted payload format", 422);
      }

      logPayload = {
        reqParams: req.params,
        reqQuery: req.query,
        reqIp: req.ip,
        reqUrl: req.url || req.originalUrl,
        reqHostname: req.hostname,
        reqMethod: req.method,
        requestType: "decryption",
        url: req.headers?.host || getters.getAppUrls().backendUrl,
        logged_in_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        payloadLength: stringData.length,
        decryptionSuccess: true,
      };

      CustomWinstonLogger("info", logPayload, "Decryption Request Success");

      req.body = { ...decryptResult.payload };
      return next();
    } catch (error) {
      const httpError = errorHandler(error, null);
      const message = httpError.message || defaultErrorMessage;
      const resolvedStatusCode =
        (httpError as any)?.status || (error as any)?.status || 422;

      logPayload = {
        reqParams: req.params,
        reqQuery: req.query,
        reqIp: req.ip,
        reqUrl: req.url || req.originalUrl,
        reqHostname: req.hostname,
        reqMethod: req.method,
        requestType: "decryption",
        url: req.headers?.host || getters.getAppUrls().backendUrl,
        logged_in_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        payloadLength: stringData?.length || 0,
        decryptionSuccess: false,
        error: message,
      };

      CustomWinstonLogger("error", logPayload, "Decryption Request Failed");

      return responseObject({
        res,
        statusCode: resolvedStatusCode,
        message,
        payload: null,
      });
    }
  };
};

const isSwaggerRequest = (req: Request): boolean => {
  const referer = String(req.headers.referer || "");
  const origin = String(req.headers.origin || "");
  const ua = String(req.headers["user-agent"] || "").toLowerCase();

  return (
    referer.includes("/docs") ||
    referer.includes("/api-docs") ||
    origin.includes("/docs") ||
    origin.includes("/api-docs") ||
    ua.includes("swagger")
  );
};

/**
 * Determine if response should be encrypted
 */
const shouldEncryptResponse = (req: Request, res: Response): boolean => {
  if (res.statusCode >= 400) {
    return false;
  }

  const excludedPatterns = [
    /\/health(\/|$)/,
    /\/metrics(\/|$)/,
    /\/docs(\/|$)/,
    /\/api-docs(\/|$)/,
    /\/health\/decrypt$/,
    /\/health\/encrypt$/,
  ];

  if (excludedPatterns.some((pattern) => pattern.test(req.path))) {
    return false;
  }

  return true;
};

const isEncryptedBodyRequired = (req: Request): boolean => {
  const path = req.path;
  const method = req.method.toUpperCase();

  // Auth
  if (method === "POST" && /\/auth\/login$/.test(path)) return true;
  if (method === "POST" && /\/auth\/register$/.test(path)) return true;

  // Onboarding
  if (method === "POST" && /\/onboarding\/create$/.test(path)) return true;
  if (method === "PATCH" && /\/onboarding\/[^/]+$/.test(path)) return true;
  if (method === "DELETE" && /\/onboarding\/[^/]+$/.test(path)) return true;

  // FAQs (write endpoints)
  if (method === "POST" && /\/faqs\/create$/.test(path)) return true;
  if (method === "PATCH" && /\/faqs\/[^/]+$/.test(path)) return true;
  if (method === "DELETE" && /\/faqs\/[^/]+$/.test(path)) return true;
  if (method === "PATCH" && /\/faqs\/[^/]+\/publish$/.test(path)) return true;
  if (method === "PATCH" && /\/faqs\/reorder$/.test(path)) return true;

  // Services (write endpoints)
  if (method === "POST" && /\/services\/create$/.test(path)) return true;
  if (method === "PATCH" && /\/services\/[^/]+$/.test(path)) return true;
  if (method === "DELETE" && /\/services\/[^/]+$/.test(path)) return true;
  if (method === "PATCH" && /\/services\/[^/]+\/publish$/.test(path)) return true;
  if (method === "PATCH" && /\/services\/reorder$/.test(path)) return true;

  // Staff (write endpoints)
  if (method === "POST" && /\/staff\/create$/.test(path)) return true;
  if (method === "PATCH" && /\/staff\/[^/]+$/.test(path)) return true;
  if (method === "DELETE" && /\/staff\/[^/]+$/.test(path)) return true;
  if (method === "PATCH" && /\/staff\/[^/]+\/status$/.test(path)) return true;
  if (method === "PATCH" && /\/staff\/[^/]+\/roles$/.test(path)) return true;
  if (method === "POST" && /\/staff\/[^/]+\/resend-invite$/.test(path)) return true;

  // Widget Config (write endpoints)
  if (method === "POST" && /\/widgetConfig\/[^/]+\/config$/.test(path)) return true;
  if (method === "PATCH" && /\/widgetConfig\/[^/]+\/token\/regenerate$/.test(path)) return true;
  if (method === "PATCH" && /\/widgetConfig\/[^/]+\/allowed-domains$/.test(path)) return true;
  if (method === "PATCH" && /\/widgetConfig\/[^/]+\/status$/.test(path)) return true;


  return false;
};

export { decryptRequestMiddleware };
