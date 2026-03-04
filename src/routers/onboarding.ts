import { constants } from "../constants";
import { RouteHandler } from "../types/route";
import { joinUrls } from "../utils";
import controllers from "../controllers";
import {
  general,
  hasPermission,
  signatureProtected,
  verifyMiddleware,
} from "../middlewares";
import { rolePermissions } from "../types/functions";

const serviceLoader: RouteHandler[] = [
  {
    path: joinUrls([constants.urls.onboarding.createOnboarding().path]),
    method: constants.urls.onboarding.createOnboarding().method,
    handlers: [
    //   signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.CREATE),
      verifyMiddleware.createOnboardingInput,
      controllers.onboarding.createOnboarding,
    ],
  },
  {
    path: joinUrls([constants.urls.onboarding.getOnboardings().path]),
    method: constants.urls.onboarding.getOnboardings().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.getOnboardingsInput,
      controllers.onboarding.getOnboardings,
    ],
  },
  {
    path: joinUrls([constants.urls.onboarding.getOnboardingById().path]),
    method: constants.urls.onboarding.getOnboardingById().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.onboardingIdParamInput,
      controllers.onboarding.getOnboardingById,
    ],
  },
  {
    path: joinUrls([constants.urls.onboarding.updateOnboarding().path]),
    method: constants.urls.onboarding.updateOnboarding().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.onboardingIdParamInput,
      verifyMiddleware.updateOnboardingInput,
      controllers.onboarding.patchOnboarding,
    ],
  },
  {
    path: joinUrls([constants.urls.onboarding.deleteOnboarding().path]),
    method: constants.urls.onboarding.deleteOnboarding().method,
    handlers: [
      signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.DELETE),
      verifyMiddleware.onboardingIdParamInput,
      controllers.onboarding.deleteOnboarding,
    ],
  },
];

export default serviceLoader;
