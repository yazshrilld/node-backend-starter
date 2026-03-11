import { NextFunction, RequestHandler, Response } from "express";
import { createHttpError, errorHandler, responseObject } from "../utils";
import { logger } from "netwrap";
import { Helpers } from "../types/types";
import {
  ValidateviewAllValidation,
  inputRequestShouldBeEncrypted,
  loginInputValidationSchema,
  registerInputValidationSchema,
  sessionInputValidation,
  createOnboardingInputValidationSchema,
  updateOnboardingInputValidationSchema,
  onboardingIdParamValidationSchema,
  createFaqInputValidationSchema,
  updateFaqInputValidationSchema,
  faqIdParamValidationSchema,
  publishFaqInputValidationSchema,
  reorderFaqsInputValidationSchema,
  getPublicFaqsInputValidationSchema,
  createServiceInputValidationSchema,
  serviceIdParamValidationSchema,
  updateServiceInputValidationSchema,
  publishServiceInputValidationSchema,
  reorderServicesInputValidationSchema,
  getPublicServicesInputValidationSchema,
  createStaffInputValidationSchema,
  updateStaffInputValidationSchema,
  staffIdParamValidationSchema,
  updateStaffStatusInputValidationSchema,
  updateStaffRolesInputValidationSchema,
} from "../utils/validate";

const createValidationMiddleware = (
  validationFn: (data: object) => {
    error?: { details: { message: string }[] };
  },
  targets: Helpers.ValidationTarget[] = ["body"],
): RequestHandler => {
  return (req: Helpers.ExtendedRequest, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Fatal error occurred";

    try {
      const dataToValidate: Record<string, any> = {};
      if (targets.includes("body")) dataToValidate.body = req.body;
      if (targets.includes("query")) dataToValidate.query = req.query;
      if (targets.includes("params")) dataToValidate.params = req.params;
      if (targets.includes("files")) dataToValidate.files = req.files;

      const { error } = validationFn(dataToValidate);
      if (error) {
        statusCode = 400;
        message = error.details[0].message;
        throw createHttpError(message, statusCode);
      }
      next();
    } catch (err) {
      logger(err, { shouldLog: true, isError: true });

      message = (err as Error).message;
      return responseObject({
        res,
        statusCode: statusCode,
        message: errorHandler(err as Error, null)?.message || message,
      });
    }
  };
};

const validateEncrtptedInput = createValidationMiddleware(
  inputRequestShouldBeEncrypted,
  ["body"],
);

const validateVeiwAllInput = createValidationMiddleware(
  ValidateviewAllValidation,
  ["query"],
);

const addSessionInput = createValidationMiddleware(sessionInputValidation, [
  "body",
]);

const loginInput = createValidationMiddleware(
  (data: any) => loginInputValidationSchema().validate(data.body),
  ["body"],
);

const registerInput = createValidationMiddleware(
  (data: any) => registerInputValidationSchema().validate(data.body),
  ["body"],
);

// onboarding
const createOnboardingInput = createValidationMiddleware(
  (data: any) => createOnboardingInputValidationSchema().validate(data.body),
  ["body"],
);

const getOnboardingsInput = createValidationMiddleware(
  ValidateviewAllValidation,
  ["query"],
);

const onboardingIdParamInput = createValidationMiddleware(
  (data: any) => onboardingIdParamValidationSchema().validate(data.params),
  ["params"],
);

const updateOnboardingInput = createValidationMiddleware(
  (data: any) => updateOnboardingInputValidationSchema().validate(data.body),
  ["body"],
);

const createFaqInput = createValidationMiddleware(
  (data: any) => createFaqInputValidationSchema().validate(data.body),
  ["body"],
);

const getFaqsInput = createValidationMiddleware(ValidateviewAllValidation, [
  "query",
]);

const faqIdParamInput = createValidationMiddleware(
  (data: any) => faqIdParamValidationSchema().validate(data.params),
  ["params"],
);

const updateFaqInput = createValidationMiddleware(
  (data: any) => updateFaqInputValidationSchema().validate(data.body),
  ["body"],
);

const publishFaqInput = createValidationMiddleware(
  (data: any) => publishFaqInputValidationSchema().validate(data.body),
  ["body"],
);

const reorderFaqsInput = createValidationMiddleware(
  (data: any) => reorderFaqsInputValidationSchema().validate(data.body),
  ["body"],
);

const getPublicFaqsInput = createValidationMiddleware(
  (data: any) => getPublicFaqsInputValidationSchema().validate(data.query),
  ["query"],
);

const createServiceInput = createValidationMiddleware(
  (data: any) => createServiceInputValidationSchema().validate(data.body),
  ["body"],
);

const getServicesInput = createValidationMiddleware(ValidateviewAllValidation, [
  "query",
]);

const serviceIdParamInput = createValidationMiddleware(
  (data: any) => serviceIdParamValidationSchema().validate(data.params),
  ["params"],
);

const updateServiceInput = createValidationMiddleware(
  (data: any) => updateServiceInputValidationSchema().validate(data.body),
  ["body"],
);

const publishServiceInput = createValidationMiddleware(
  (data: any) => publishServiceInputValidationSchema().validate(data.body),
  ["body"],
);

const reorderServicesInput = createValidationMiddleware(
  (data: any) => reorderServicesInputValidationSchema().validate(data.body),
  ["body"],
);

const getPublicServicesInput = createValidationMiddleware(
  (data: any) => getPublicServicesInputValidationSchema().validate(data.query),
  ["query"],
);

const createStaffInput = createValidationMiddleware(
  (data: any) => createStaffInputValidationSchema().validate(data.body),
  ["body"],
);

const getStaffsInput = createValidationMiddleware(ValidateviewAllValidation, [
  "query",
]);

const staffIdParamInput = createValidationMiddleware(
  (data: any) => staffIdParamValidationSchema().validate(data.params),
  ["params"],
);

const updateStaffInput = createValidationMiddleware(
  (data: any) => updateStaffInputValidationSchema().validate(data.body),
  ["body"],
);

const updateStaffStatusInput = createValidationMiddleware(
  (data: any) => updateStaffStatusInputValidationSchema().validate(data.body),
  ["body"],
);

const updateStaffRolesInput = createValidationMiddleware(
  (data: any) => updateStaffRolesInputValidationSchema().validate(data.body),
  ["body"],
);


const verifyMiddleware = {
  validateEncrtptedInput,
  validateVeiwAllInput,
  addSessionInput,
  loginInput,
  registerInput,
  createOnboardingInput,
  getOnboardingsInput,
  onboardingIdParamInput,
  updateOnboardingInput,
  createFaqInput,
  getFaqsInput,
  faqIdParamInput,
  updateFaqInput,
  publishFaqInput,
  reorderFaqsInput,
  getPublicFaqsInput,
  createServiceInput,
  getServicesInput,
  serviceIdParamInput,
  updateServiceInput,
  publishServiceInput,
  reorderServicesInput,
  getPublicServicesInput,
  createStaffInput,
  getStaffsInput,
  staffIdParamInput,
  updateStaffInput,
  updateStaffStatusInput,
  updateStaffRolesInput,
};

export { verifyMiddleware };
