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
    path: joinUrls([constants.urls.dashboard.getSummary().path]),
    method: constants.urls.dashboard.getSummary().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.dashboardQueryInput,
      controllers.dashboard.getSummary,
    ],
  },
  {
    path: joinUrls([constants.urls.dashboard.getActivityFeed().path]),
    method: constants.urls.dashboard.getActivityFeed().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.dashboardQueryInput,
      controllers.dashboard.getActivityFeed,
    ],
  },
  {
    path: joinUrls([constants.urls.dashboard.getAlerts().path]),
    method: constants.urls.dashboard.getAlerts().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.dashboardQueryInput,
      controllers.dashboard.getAlerts,
    ],
  },
  {
    path: joinUrls([constants.urls.dashboard.getHealth().path]),
    method: constants.urls.dashboard.getHealth().method,
    handlers: [
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.dashboardQueryInput,
      controllers.dashboard.getHealth,
    ],
  },
];

export default serviceLoader;
