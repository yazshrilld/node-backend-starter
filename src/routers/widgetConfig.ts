import { constants } from "../constants";
import { RouteHandler } from "../types/route";
import { joinUrls } from "../utils";
import controllers from "../controllers";
import {
  general,
  hasPermission,//   signatureProtected,
  verifyMiddleware,
} from "../middlewares";
import { rolePermissions } from "../types/functions";

const serviceLoader: RouteHandler[] = [
  {
    path: joinUrls([constants.urls.widgetConfig.upsertWidgetConfig().path]),
    method: constants.urls.widgetConfig.upsertWidgetConfig().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.upsertWidgetConfigInput,
      controllers.widgetConfig.upsertWidgetConfig,
    ],
  },
  {
    path: joinUrls([constants.urls.widgetConfig.getWidgetConfig().path]),
    method: constants.urls.widgetConfig.getWidgetConfig().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.widgetCompanyIdParamInput,
      controllers.widgetConfig.getWidgetConfig,
    ],
  },
  {
    path: joinUrls([constants.urls.widgetConfig.regenerateWidgetToken().path]),
    method: constants.urls.widgetConfig.regenerateWidgetToken().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.widgetCompanyIdParamInput,
      controllers.widgetConfig.regenerateWidgetToken,
    ],
  },
  {
    path: joinUrls([constants.urls.widgetConfig.patchAllowedDomains().path]),
    method: constants.urls.widgetConfig.patchAllowedDomains().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.widgetCompanyIdParamInput,
      verifyMiddleware.patchAllowedDomainsInput,
      controllers.widgetConfig.patchAllowedDomains,
    ],
  },
  {
    path: joinUrls([constants.urls.widgetConfig.patchWidgetStatus().path]),
    method: constants.urls.widgetConfig.patchWidgetStatus().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.widgetCompanyIdParamInput,
      verifyMiddleware.patchWidgetStatusInput,
      controllers.widgetConfig.patchWidgetStatus,
    ],
  },
  {
    path: joinUrls([constants.urls.widgetConfig.getPublicWidgetRuntimeConfig().path]),
    method: constants.urls.widgetConfig.getPublicWidgetRuntimeConfig().method,
    handlers: [
      // signatureProtected,
      verifyMiddleware.widgetCompanyIdParamInput,
      controllers.widgetConfig.getPublicWidgetRuntimeConfig,
    ],
  },
];

export default serviceLoader;
