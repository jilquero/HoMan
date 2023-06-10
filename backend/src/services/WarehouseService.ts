import Logger from "../util/Logger";
import WarehouseRepository from "../repository/WarehouseRepository";
import {
  EditWarehouse,
  EditWarehouseContext,
  NewWarehouse,
  NewWarehouseContext,
} from "../models/Warehouse";
import ProductsService from "./ProductsService";
import UserService from "./UserService";

async function getWarehouseById(id: string) {
  return await WarehouseRepository.getWarehouseById(id);
}

async function createWarehouse(userId: string, data: NewWarehouse) {
  const warehouse = await WarehouseRepository.createWarehouse(data);
  const ownerRole = await WarehouseRepository.addRole(warehouse.id, {
    name: "OWNER",
    permissions: [
      "READ_PRODUCTS",
      "WRITE_PRODUCTS",
      "DELETE_PRODUCTS",
      "READ_WAREHOUSES",
      "WRITE_WAREHOUSES",
      "DELETE_WAREHOUSES",
      "READ_CONTEXTS",
      "WRITE_CONTEXTS",
      "DELETE_CONTEXTS",
      "READ_HISTORY",
      "READ_STATISTICS",
    ],
  });
  const _userRole = await WarehouseRepository.addRole(warehouse.id, {
    name: "USER",
    permissions: [
      "READ_PRODUCTS",
      "WRITE_PRODUCTS",
      "READ_WAREHOUSES",
      "READ_CONTEXTS",
      "READ_HISTORY",
      "READ_STATISTICS",
    ],
  });
  const context = await WarehouseRepository.addContext(warehouse.id, {
    status: "ACTIVE",
    userId: userId,
    roles: [ownerRole.roles[0].id],
  });
  const _history = await WarehouseRepository.addHistory(warehouse.id, {
    action: "CREATE",
    targetId: warehouse.id,
    targetType: "WAREHOUSE",
    contextId: context.id,
  });
  return warehouse;
}

async function updateWarehouse(
  userId: string,
  id: string,
  data: EditWarehouse
) {
  const warehouse = await WarehouseRepository.updateWarehouse(id, data);
  const _history = await WarehouseRepository.addHistory(warehouse.id, {
    action: "UPDATE",
    targetId: warehouse.id,
    targetType: "WAREHOUSE",
    contextId: userId,
  });
  return warehouse;
}

async function deleteWarehouseById(id: string) {
  return WarehouseRepository.deleteWarehouseById(id);
}

async function addProduct(userId: string, id: string, data: any) {
  // if (data.productId) {
  //   const product = await ProductsService.getById(data.productId);
  //   if (!product) {
  //     return null;
  //   }
  //   data.image = product.image;
  //   data.name = product.name;
  //   data.description = product.description;
  // }
  const product = await WarehouseRepository.addProduct(id, data);
  const _history = await WarehouseRepository.addHistory(id, {
    action: "CREATE",
    targetId: product.id,
    targetType: "PRODUCT",
    contextId: userId,
  });
  return product;
}

async function removeProduct(userId: string, id: string, productId: string) {
  const product = await WarehouseRepository.removeProduct(productId);
  const _history = await WarehouseRepository.addHistory(id, {
    action: "DELETE",
    targetId: productId,
    targetType: "PRODUCT",
    contextId: userId,
  });
  return product;
}

async function updateProduct(
  userId: string,
  id: string,
  productId: string,
  data: any
) {
  const product = await WarehouseRepository.updateProduct(id, productId, data);
  const _history = await WarehouseRepository.addHistory(id, {
    action: "UPDATE",
    targetId: productId,
    amount: data.amount,
    targetType: "PRODUCT",
    contextId: userId,
  });
  return product;
}

async function getProducts(id: string) {
  return await WarehouseRepository.getProducts(id);
}

async function addContext(
  userId: string,
  id: string,
  data: NewWarehouseContext
) {
  const context = await WarehouseRepository.addContext(id, data);
  const _history = await WarehouseRepository.addHistory(id, {
    action: "CREATE",
    targetId: context.id,
    targetType: "CONTEXT",
    contextId: userId,
  });
  return context;
}

async function removeContext(userId: string, id: string, contextId: string) {
  const context = await WarehouseRepository.removeContext(id, contextId);
  const _history = await WarehouseRepository.addHistory(id, {
    action: "DELETE",
    targetId: contextId,
    targetType: "CONTEXT",
    contextId: userId,
  });
  return context;
}

async function updateContext(
  userId: string,
  id: string,
  contextId: string,
  data: EditWarehouseContext
) {
  const contexts = await WarehouseRepository.getContexts(id);
  const activeContexts = contexts.filter((c) => c.status === "ACTIVE");
  if (activeContexts.length === 1 && data.status === "INACTIVE") {
    return deleteWarehouseById(id);
  }
  // Logger.info("activeContexts: " + JSON.stringify(activeContexts, null, 2));
  const ownerContexts = activeContexts.filter((c) => {
    return c.roles.filter((r) => r.name === "OWNER").length;
  });
  // Logger.info("ownerContexts: " + JSON.stringify(ownerContexts, null, 2));
  // const contexts = await WarehouseRepository.getContexts(id);
  // const ctx = contexts.filter((c) => c.status === "ACTIVE");
  // if (ctx?.length === 1 && data.status === "INACTIVE") {
  //   return deleteWarehouseById(id);
  // }
  // const ownerContexts = contexts.filter((c) =>
  //   c.roles.filter((r) => r.name === "OWNER")
  // );
  const roles = await WarehouseRepository.getRoles(id);
  const role = roles?.roles.filter((r) => r.name === "OWNER")[0];
  if (ownerContexts.length <= 1) {
    const randomContext = contexts.filter((c) => c.userId !== userId)[0];
    Logger.info("randomContext: " + JSON.stringify(role?.id));
    const _context = await WarehouseRepository.changeContextRoles(
      randomContext.id,
      {
        roles: [role?.id],
      }
    );
  }
  let context;
  if (data.roles) {
    const ids = roles?.roles
      .filter((r) => data.roles?.indexOf(r.name) !== -1)
      .map((r) => r.id);
    Logger.info("ids: " + JSON.stringify(ids));
    context = await WarehouseRepository.changeContextRoles(contextId, {
      roles: ids,
    });
  }
  if (data.status) {
    Logger.info("data.roles: " + JSON.stringify(data));
    context = await WarehouseRepository.updateContext(contextId, {
      status: data.status,
    });
  }
  const _history = await WarehouseRepository.addHistory(id, {
    action: "UPDATE",
    targetId: contextId,
    targetType: "CONTEXT",
    contextId: userId,
  });
  return context;
}

async function addRole(id: string, data: any) {
  return await WarehouseRepository.addRole(id, data);
}

async function removeRole(id: string, roleId: string) {
  return await WarehouseRepository.removeRole(id, roleId);
}

async function getRoles(id: string) {
  return await WarehouseRepository.getRoles(id);
}

async function getContexts(id: string) {
  return await WarehouseRepository.getContexts(id);
}

async function addHistory(id: string, data: any) {
  return await WarehouseRepository.addHistory(id, data);
}

async function getHistory(id: string) {
  return await WarehouseRepository.getHistory(id);
}

async function getStatistics(id: string) {
  return null;
}

export default {
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouseById,
  addProduct,
  updateProduct,
  removeProduct,
  updateContext,
  getProducts,
  addContext,
  removeContext,
  getContexts,
  addRole,
  removeRole,
  getRoles,
  addHistory,
  getHistory,
  getStatistics,
} as const;
