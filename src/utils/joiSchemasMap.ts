import {
  ValidateviewAllValidation,
  inputRequestShouldBeEncrypted,
  loginInputValidationSchema,
  registerInputValidationSchema,
  sessionInputValidationSchema,
  createOnboardingInputValidationSchema,
  updateOnboardingInputValidationSchema,
  onboardingIdParamValidationSchema,
} from "./validate";

/**
 * Map middleware validator keys to their respective Joi validator functions
 */
export const joiSchemasMap: Record<string, Function> = {
  validateVeiwAllInput: ValidateviewAllValidation,
  validateEncrtptedInput: inputRequestShouldBeEncrypted,
  addSessionInput: sessionInputValidationSchema,
  loginInput: loginInputValidationSchema,
  registerInput: registerInputValidationSchema,

  createOnboardingInput: createOnboardingInputValidationSchema,
  getOnboardingsInput: ValidateviewAllValidation,
  onboardingIdParamInput: onboardingIdParamValidationSchema,
  updateOnboardingInput: updateOnboardingInputValidationSchema,
};
