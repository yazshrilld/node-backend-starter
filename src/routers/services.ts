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
    path: joinUrls([constants.urls.services.createService().path]),
    method: constants.urls.services.createService().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.CREATE),
      verifyMiddleware.createServiceInput,
      controllers.services.createService,
    ],
  },
  {
    path: joinUrls([constants.urls.services.getServices().path]),
    method: constants.urls.services.getServices().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.getServicesInput,
      controllers.services.getServices,
    ],
  },
  {
    path: joinUrls([constants.urls.services.getServiceById().path]),
    method: constants.urls.services.getServiceById().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.serviceIdParamInput,
      controllers.services.getServiceById,
    ],
  },
  {
    path: joinUrls([constants.urls.services.updateService().path]),
    method: constants.urls.services.updateService().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.serviceIdParamInput,
      verifyMiddleware.updateServiceInput,
      controllers.services.patchService,
    ],
  },
  {
    path: joinUrls([constants.urls.services.deleteService().path]),
    method: constants.urls.services.deleteService().method,
    handlers: [
      signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.DELETE),
      verifyMiddleware.serviceIdParamInput,
      controllers.services.deleteService,
    ],
  },
  {
    path: joinUrls([constants.urls.services.publishService().path]),
    method: constants.urls.services.publishService().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.serviceIdParamInput,
      verifyMiddleware.publishServiceInput,
      controllers.services.publishService,
    ],
  },
  {
    path: joinUrls([constants.urls.services.reorderServices().path]),
    method: constants.urls.services.reorderServices().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.reorderServicesInput,
      controllers.services.reorderServices,
    ],
  },
  {
    path: joinUrls([constants.urls.services.getPublicServices().path]),
    method: constants.urls.services.getPublicServices().method,
    handlers: [
      // signatureProtected,
      verifyMiddleware.getPublicServicesInput,
      controllers.services.getPublicServices,
    ],
  },
];

export default serviceLoader;
