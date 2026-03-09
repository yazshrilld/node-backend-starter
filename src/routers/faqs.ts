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
    path: joinUrls([constants.urls.faqs.createFaq().path]),
    method: constants.urls.faqs.createFaq().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.CREATE),
      verifyMiddleware.createFaqInput,
      controllers.faqs.createFaq,
    ],
  },
  {
    path: joinUrls([constants.urls.faqs.getFaqs().path]),
    method: constants.urls.faqs.getFaqs().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.getFaqsInput,
      controllers.faqs.getFaqs,
    ],
  },
  {
    path: joinUrls([constants.urls.faqs.getFaqById().path]),
    method: constants.urls.faqs.getFaqById().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.faqIdParamInput,
      controllers.faqs.getFaqById,
    ],
  },
  {
    path: joinUrls([constants.urls.faqs.updateFaq().path]),
    method: constants.urls.faqs.updateFaq().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.faqIdParamInput,
      verifyMiddleware.updateFaqInput,
      controllers.faqs.patchFaq,
    ],
  },
  {
    path: joinUrls([constants.urls.faqs.deleteFaq().path]),
    method: constants.urls.faqs.deleteFaq().method,
    handlers: [
      signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.DELETE),
      verifyMiddleware.faqIdParamInput,
      controllers.faqs.deleteFaq,
    ],
  },
  {
    path: joinUrls([constants.urls.faqs.publishFaq().path]),
    method: constants.urls.faqs.publishFaq().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.faqIdParamInput,
      verifyMiddleware.publishFaqInput,
      controllers.faqs.publishFaq,
    ],
  },
  {
    path: joinUrls([constants.urls.faqs.reorderFaqs().path]),
    method: constants.urls.faqs.reorderFaqs().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.reorderFaqsInput,
      controllers.faqs.reorderFaqs,
    ],
  },
  {
    path: joinUrls([constants.urls.faqs.getPublicFaqs().path]),
    method: constants.urls.faqs.getPublicFaqs().method,
    handlers: [
      // signatureProtected,
      verifyMiddleware.getPublicFaqsInput,
      controllers.faqs.getPublicFaqs,
    ],
  },
];

export default serviceLoader;