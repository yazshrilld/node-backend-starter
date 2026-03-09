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
};

export { verifyMiddleware };
