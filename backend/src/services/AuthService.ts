import { Permission } from "../models/Warehouse";
import Logger from "../util/Logger";
import PwdUtil from "../util/PwdUtil";
import UserService from "./UserService";
import WarehouseService from "./WarehouseService";

async function authN(email: string, password: string) {
  const user = await UserService.getByEmail(email);
  if (!user) {
    return null;
  }
  const isMatch = await PwdUtil.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
}

export async function authZ(
  warehouseId: string,
  userId: string,
  permission: Permission,
  needsActive: boolean
) {
  const contexts = await WarehouseService.getContexts(warehouseId);
  const context = contexts
    .filter((c) => c.userId === userId)
    .filter(
      (c) => c.status === "ACTIVE" || (c.status === "PENDING" && !needsActive)
    )[0];
  Logger.info("context: " + JSON.stringify(context));
  if (!context) {
    return false;
  }
  const permissions = context.roles.flatMap((r) => r.permissions);
  // Logger.info("permissions: " + JSON.stringify(permissions));
  if (permissions.indexOf(permission) === -1) {
    return false;
  }
  return true;
}

export default {
  authN,
  authZ,
} as const;
