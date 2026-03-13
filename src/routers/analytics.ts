import { constants } from "../constants";
import { RouteHandler } from "../types/route";
import { joinUrls } from "../utils";
import controllers from "../controllers";
import {
  general,
  hasPermission,
  verifyMiddleware,
} from "../middlewares";
import { rolePermissions } from "../types/functions";

const serviceLoader: RouteHandler[] = [
  {
    path: joinUrls([constants.urls.analytics.getOverview().path]),
    method: constants.urls.analytics.getOverview().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.analyticsQueryInput,
      controllers.analytics.getOverview,
    ],
  },
  {
    path: joinUrls([constants.urls.analytics.getUsage().path]),
    method: constants.urls.analytics.getUsage().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.analyticsQueryInput,
      controllers.analytics.getUsage,
    ],
  },
  {
    path: joinUrls([constants.urls.analytics.getIssues().path]),
    method: constants.urls.analytics.getIssues().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.analyticsQueryInput,
      controllers.analytics.getIssues,
    ],
  },
  {
    path: joinUrls([constants.urls.analytics.getResponseTimes().path]),
    method: constants.urls.analytics.getResponseTimes().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.analyticsQueryInput,
      controllers.analytics.getResponseTimes,
    ],
  },
  {
    path: joinUrls([constants.urls.analytics.getSatisfaction().path]),
    method: constants.urls.analytics.getSatisfaction().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.analyticsQueryInput,
      controllers.analytics.getSatisfaction,
    ],
  },
];

export default serviceLoader;
