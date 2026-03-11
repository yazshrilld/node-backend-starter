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
    path: joinUrls([constants.urls.staff.createStaff().path]),
    method: constants.urls.staff.createStaff().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.CREATE),
      verifyMiddleware.createStaffInput,
      controllers.staff.createStaff,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.getStaffs().path]),
    method: constants.urls.staff.getStaffs().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.getStaffsInput,
      controllers.staff.getStaffs,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.getStaffById().path]),
    method: constants.urls.staff.getStaffById().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      verifyMiddleware.staffIdParamInput,
      controllers.staff.getStaffById,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.updateStaff().path]),
    method: constants.urls.staff.updateStaff().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.staffIdParamInput,
      verifyMiddleware.updateStaffInput,
      controllers.staff.patchStaff,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.deleteStaff().path]),
    method: constants.urls.staff.deleteStaff().method,
    handlers: [
      signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.DELETE),
      verifyMiddleware.staffIdParamInput,
      controllers.staff.deleteStaff,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.updateStaffStatus().path]),
    method: constants.urls.staff.updateStaffStatus().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.staffIdParamInput,
      verifyMiddleware.updateStaffStatusInput,
      controllers.staff.patchStaffStatus,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.updateStaffRoles().path]),
    method: constants.urls.staff.updateStaffRoles().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.staffIdParamInput,
      verifyMiddleware.updateStaffRolesInput,
      controllers.staff.patchStaffRoles,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.resendInvite().path]),
    method: constants.urls.staff.resendInvite().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.UPDATE),
      verifyMiddleware.staffIdParamInput,
      controllers.staff.resendInvite,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.getRoles().path]),
    method: constants.urls.staff.getRoles().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      controllers.staff.getRoles,
    ],
  },
  {
    path: joinUrls([constants.urls.staff.getPermissions().path]),
    method: constants.urls.staff.getPermissions().method,
    handlers: [
      // signatureProtected,
      general,
      hasPermission(["admin", "super_admin"], rolePermissions.READ),
      controllers.staff.getPermissions,
    ],
  },
];

export default serviceLoader;
