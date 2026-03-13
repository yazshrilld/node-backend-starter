import {
  ValidateviewAllValidation,
  inputRequestShouldBeEncrypted,
  loginInputValidationSchema,
  registerInputValidationSchema,
  sessionInputValidationSchema,
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
  updateServiceInputValidationSchema,
  serviceIdParamValidationSchema,
  publishServiceInputValidationSchema,
  reorderServicesInputValidationSchema,
  getPublicServicesInputValidationSchema,
  createStaffInputValidationSchema,
  updateStaffInputValidationSchema,
  staffIdParamValidationSchema,
  updateStaffStatusInputValidationSchema,
  updateStaffRolesInputValidationSchema,
  widgetCompanyIdParamValidationSchema,
  upsertWidgetConfigInputValidationSchema,
  patchAllowedDomainsInputValidationSchema,
  patchWidgetStatusInputValidationSchema,
  analyticsQueryInputValidationSchema,

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

  createFaqInput: createFaqInputValidationSchema,
  getFaqsInput: ValidateviewAllValidation,
  faqIdParamInput: faqIdParamValidationSchema,
  updateFaqInput: updateFaqInputValidationSchema,
  publishFaqInput: publishFaqInputValidationSchema,
  reorderFaqsInput: reorderFaqsInputValidationSchema,
  getPublicFaqsInput: getPublicFaqsInputValidationSchema,

  createServiceInput: createServiceInputValidationSchema,
  getServicesInput: ValidateviewAllValidation,
  serviceIdParamInput: serviceIdParamValidationSchema,
  updateServiceInput: updateServiceInputValidationSchema,
  publishServiceInput: publishServiceInputValidationSchema,
  reorderServicesInput: reorderServicesInputValidationSchema,
  getPublicServicesInput: getPublicServicesInputValidationSchema,

  createStaffInput: createStaffInputValidationSchema,
  getStaffsInput: ValidateviewAllValidation,
  staffIdParamInput: staffIdParamValidationSchema,
  updateStaffInput: updateStaffInputValidationSchema,
  updateStaffStatusInput: updateStaffStatusInputValidationSchema,
  updateStaffRolesInput: updateStaffRolesInputValidationSchema,

  widgetCompanyIdParamInput: widgetCompanyIdParamValidationSchema,
  upsertWidgetConfigInput: upsertWidgetConfigInputValidationSchema,
  patchAllowedDomainsInput: patchAllowedDomainsInputValidationSchema,
  patchWidgetStatusInput: patchWidgetStatusInputValidationSchema,

  analyticsQueryInput: analyticsQueryInputValidationSchema,

};
