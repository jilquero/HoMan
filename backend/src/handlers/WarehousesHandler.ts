import {
  EditWarehouseContext,
  NewWarehouse,
  Permission,
  editWarehouseContextValidationSchema,
  newWarehouseValidationSchema,
} from "../models/Warehouse";
import AuthService from "../services/AuthService";
import WarehouseService from "../services/WarehouseService";
import Logger from "../util/Logger";
import {
  NewWarehouseContext,
  newWarehouseContextValidationSchema,
} from "../models/Warehouse";
import UserService from "../services/UserService";

export async function createWarehouse(c, req, res) {
  const newWarehouse: NewWarehouse = newWarehouseValidationSchema.parse(
    c.request.body
  );
  const warehouse = await WarehouseService.createWarehouse(
    c.user.id,
    newWarehouse
  );
  return res
    .setHeader("location", warehouse.id)
    .status(200)
    .json({ id: warehouse.id });
}

export async function getWarehouse(c, req, res) {
  const warehouse = await WarehouseService.getWarehouseById(
    c.request.params.warehouseId
  );
  return res.status(200).json(warehouse);
}

export async function updateWarehouse(c, req, res) {
  const warehouse = await WarehouseService.updateWarehouse(
    c.user.id,
    c.request.params.warehouseId,
    c.request.body
  );
  return res.status(200).json(warehouse);
}

export async function deleteWarehouse(c, req, res) {
  Logger.warn("deleteWarehouse");
  const warehouse = await WarehouseService.deleteWarehouseById(
    c.request.params.warehouseId
  );
  return res.status(200).json(warehouse);
}

export async function addWarehouseProduct(c, req, res) {
  const product = await WarehouseService.addProduct(
    c.user.id,
    c.request.params.warehouseId,
    c.request.body
  );
  return res.status(200).json(product);
}

export async function removeWarehouseProduct(c, req, res) {
  const warehouse = await WarehouseService.removeProduct(
    c.user.id,
    c.request.params.warehouseId,
    c.request.params.productId
  );
  return res.status(200).json(warehouse);
}

export async function getWarehouseProducts(c, req, res) {
  const products = await WarehouseService.getProducts(
    c.request.params.warehouseId
  );
  return res.status(200).json(products);
}

export async function updateWarehouseProduct(c, req, res) {
  const { warehouseId, productId } = c.request.params;
  const warehouse = await WarehouseService.updateProduct(
    c.user.id,
    warehouseId,
    productId,
    c.request.body
  );
  return res.status(200).json(warehouse);
}

export async function deleteWarehouseProduct(c, req, res) {
  Logger.warn("removeWarehouseProduct: " + c.request.params.productId);
  const warehouse = await WarehouseService.removeProduct(
    c.user.id,
    c.request.params.warehouseId,
    c.request.params.productId
  );
  return res.status(200).json(warehouse);
}

export async function addWarehouseContext(c, req, res) {
  const user = await UserService.getByEmail(c.request.body.email);
  Logger.info("user: " + JSON.stringify(user));
  if (!user) {
    return res.status(400).json({ msg: "Bad Request" });
  }

  const roles = await WarehouseService.getRoles(c.request.params.warehouseId);
  const ids = roles?.roles
    .filter((r) => c.request.body.roles.indexOf(r.name) !== -1)
    .map((r) => r.id);
  Logger.info("ids: " + JSON.stringify(ids));
  Logger.info("roles: " + JSON.stringify(roles));
  if (!ids || ids.length !== c.request.body.roles.length) {
    return res.status(400).json({ msg: "Bad Request" });
  }

  let newContext: NewWarehouseContext =
    newWarehouseContextValidationSchema.parse({
      userId: user.id,
      roles: c.request.body.roles,
    });
  newContext.roles = ids;

  const warehouse = await WarehouseService.addContext(
    c.user.id,
    c.request.params.warehouseId,
    newContext
  );
  return res.status(200).json(warehouse);
}

export async function getWarehouseContext(c, req, res) {
  const context = await WarehouseService.getContexts(
    c.request.params.warehouseId
  );
  return res.status(200).json(context);
}

export async function getWarehouseContexts(c, req, res) {
  const contexts = await WarehouseService.getContexts(
    c.request.params.warehouseId
  );
  return res.status(200).json(contexts);
}

export async function acceptWarehouseContext(c, req, res) {
  const { warehouseId, contextId } = c.request.params;
  const userId = c.user.id;
  const contexts = await WarehouseService.getContexts(warehouseId);
  const context = contexts
    .filter((c) => c.userId === userId)
    .filter((c) => c.status === "PENDING")[0];
  if (!context || context.status !== "PENDING") {
    return res.status(403).json({ msg: "Forbidden" });
  }

  const editContext: EditWarehouseContext =
    editWarehouseContextValidationSchema.parse({ status: "ACTIVE" });
  const warehouse = await WarehouseService.updateContext(
    userId,
    warehouseId,
    contextId,
    editContext
  );
  return res.status(200).json({ msg: "ok" });
}

export async function leaveWarehouseContext(c, req, res) {
  const { warehouseId, contextId } = c.request.params;
  const userId = c.user.id;
  const contexts = await WarehouseService.getContexts(warehouseId);
  Logger.info("contexts: " + JSON.stringify(contexts, null, 2));
  const context = contexts
    .filter((c) => c.userId === userId)
    .filter((c) => c.status !== "INACTIVE")[0];
  Logger.info("context: " + JSON.stringify(context, null, 2));
  if (!context || context.status !== "ACTIVE") {
    return res.status(403).json({ msg: "Forbidden" });
  }

  const editContext: EditWarehouseContext =
    editWarehouseContextValidationSchema.parse({ status: "INACTIVE" });
  const warehouse = await WarehouseService.updateContext(
    userId,
    warehouseId,
    contextId,
    editContext
  );
  return res.status(200).json({ msg: "ok" });
}

export async function updateWarehouseContext(c, req, res) {
  const roles = await WarehouseService.getRoles(c.request.params.warehouseId);
  Logger.info("roles: " + JSON.stringify(roles));
  if (c.request.body.roles) {
    const ids = roles?.roles
      .filter((r) => c.request.body.roles.indexOf(r.name) !== -1)
      .map((r) => r.id);
    if (!ids || ids.length !== c.request.body.roles.length) {
      return res.status(400).json({ msg: "Bad Request" });
    }
  }

  const editContext: EditWarehouseContext =
    editWarehouseContextValidationSchema.parse(c.request.body);
  const warehouse = await WarehouseService.updateContext(
    c.user.id,
    c.request.params.warehouseId,
    c.request.params.contextId,
    editContext
  );
  return res.status(200).json({ msg: "ok" });
}

// export async function deleteWarehouseContext(c, req, res) {
//   const warehouse = await WarehouseService.removeContext(
//     c.request.params.warehouseId,
//     c.request.body
//   );
//   res.status(200).json({ msg: "ok" });
//   res.status(200).json({ warehouse: warehouse });
// }

export async function getWarehouseHistory(c, req, res) {
  const history = await WarehouseService.getHistory(
    c.request.params.warehouseId
  );
  return res.status(200).json(history);
}

export async function getWarehouseStatistics(c, req, res) {
  const statistics = await WarehouseService.getStatistics(
    c.request.params.warehouseId
  );
  return res.status(200).json(statistics);
}

async function authorize(c, req, res, func, permission, needsActive = true) {
  const auth = await AuthService.authZ(
    c.request.params.warehouseId,
    c.user.id,
    permission,
    needsActive
  );
  if (!auth) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  try {
    func(c, req, res);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export const warehousesHandlers = {
  createWarehouse,
  getWarehouse: async (c, req, res) =>
    authorize(
      c,
      req,
      res,
      getWarehouse,
      Permission.enum.READ_WAREHOUSES,
      false
    ),
  updateWarehouse: async (c, req, res) =>
    authorize(c, req, res, updateWarehouse, Permission.enum.WRITE_WAREHOUSES),
  deleteWarehouse: async (c, req, res) =>
    authorize(c, req, res, deleteWarehouse, Permission.enum.DELETE_WAREHOUSES),
  getWarehouseProducts: async (c, req, res) =>
    authorize(c, req, res, getWarehouseProducts, Permission.enum.READ_PRODUCTS),
  addWarehouseProduct: async (c, req, res) =>
    authorize(c, req, res, addWarehouseProduct, Permission.enum.WRITE_PRODUCTS),
  updateWarehouseProduct: async (c, req, res) =>
    authorize(
      c,
      req,
      res,
      updateWarehouseProduct,
      Permission.enum.WRITE_PRODUCTS
    ),
  deleteWarehouseProduct: async (c, req, res) =>
    authorize(
      c,
      req,
      res,
      deleteWarehouseProduct,
      Permission.enum.DELETE_PRODUCTS
    ),
  getWarehouseContexts: async (c, req, res) =>
    authorize(c, req, res, getWarehouseContexts, Permission.enum.READ_CONTEXTS),
  addWarehouseContext: async (c, req, res) =>
    authorize(c, req, res, addWarehouseContext, Permission.enum.WRITE_CONTEXTS),
  updateWarehouseContext,
  // deleteWarehouseContext,
  getWarehouseHistory: async (c, req, res) =>
    authorize(c, req, res, getWarehouseHistory, Permission.enum.READ_HISTORY),
  getWarehouseStatistics: async (c, req, res) =>
    authorize(
      c,
      req,
      res,
      getWarehouseStatistics,
      Permission.enum.READ_STATISTICS
    ),
  acceptWarehouseContext,
  leaveWarehouseContext,
};
