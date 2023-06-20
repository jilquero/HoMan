import prisma from "../../lib/prisma";
import {
  EditWarehouse,
  NewWarehouse,
  Warehouse,
  warehouseValidationSchema,
} from "../models/Warehouse";
import Logger from "../util/Logger";

async function getWarehouseById(id: string): Promise<Warehouse> {
  const warehouse = await prisma.warehouse.findUnique({
    where: {
      id: id,
    },
  });
  return warehouseValidationSchema.parse(warehouse);
}

async function createWarehouse(data: NewWarehouse): Promise<Warehouse> {
  const warehouse = await prisma.warehouse.create({ data: data });
  return warehouseValidationSchema.parse(warehouse);
}

async function updateWarehouse(
  id: string,
  data: EditWarehouse
): Promise<Warehouse> {
  const warehouse = await prisma.warehouse.update({
    where: {
      id: id,
    },
    data: data,
  });
  return warehouseValidationSchema.parse(warehouse);
}

async function deleteWarehouseById(id: string) {
  return await prisma.warehouse.delete({
    where: {
      id: id,
    },
  });
}

async function addProduct(id: string, data: any) {
  // return await prisma.warehouse.update({
  //   where: {
  //     id: id,
  //   },
  //   data: {
  //     products: {
  //       create: data,
  //     },
  //   },
  //   select: {
  //     products: true,
  //   },
  // });
  const product = await prisma.warehoueProduct.create({
    data: {
      ...data,
      warehouse: {
        connect: {
          id: id,
        },
      },
    },
  });
  return product;
}

async function removeProduct(productId: string) {
  Logger.warn("removeProduct: " + JSON.stringify(productId));
  // return await prisma.warehouse.update({
  //   where: {
  //     id: id,
  //   },
  //   data: {
  //     products: {
  //       delete: {
  //         id: productId,
  //       },
  //     },
  //   },
  // });
  const product = await prisma.warehoueProduct.delete({
    where: {
      id: productId,
    },
  });
  return product;
}

async function updateProduct(id: string, productId: string, data: any) {
  const product = await prisma.warehoueProduct.update({
    where: {
      id: productId,
    },
    data: data,
  });
  return product;
}

async function getProducts(id: string) {
  const products = await prisma.warehoueProduct.findMany({
    where: {
      warehouseId: id,
    },
  });
  return products;
}

async function addContext(id: string, data: any) {
  const createdContext = await prisma.context.create({
    data: {
      status: data.status,
      user: {
        connect: {
          id: data.userId,
        },
      },
      warehouse: {
        connect: {
          id: id,
        },
      },
      roles: {
        createMany: {
          data: data.roles.map((r) => ({ roleId: r })),
        },
      },
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });
  const context = {
    ...createdContext,
    roles: createdContext.roles.map((r) => r.role),
  };
  return context;
}

async function removeContext(id: string, contextId: string) {
  const context = await prisma.context.delete({
    where: {
      id: contextId,
    },
  });
  return context;
}

async function updateContext(contextId: string, data: any) {
  Logger.warn("updateContext: " + JSON.stringify(contextId));
  Logger.warn("updateContext: " + JSON.stringify(data));
  const context = await prisma.context.update({
    where: {
      id: contextId,
    },
    data: data,
  });
  return context;
}

async function changeContextRoles(contextId: string, data: any) {
  Logger.warn("changeContextRoles: " + JSON.stringify(data));
  const roles = await prisma.contextRole.deleteMany({
    where: {
      contextId: contextId,
    },
  });
  const createdContext = await prisma.context.update({
    where: {
      id: contextId,
    },
    data: {
      roles: {
        createMany: {
          data: data.roles.map((r) => ({ roleId: r })),
        },
      },
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });
  const context = {
    ...createdContext,
    roles: createdContext.roles.map((r) => r.role),
  };
  return context;
}

async function getContexts(id: string) {
  const contexts = await prisma.context.findMany({
    where: {
      warehouseId: id,
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });
  return contexts.map((c) => ({
    ...c,
    roles: c.roles.map((r) => r.role),
  }));
}

async function addRole(id: string, data: any) {
  return await prisma.warehouse.update({
    where: {
      id: id,
    },
    data: {
      roles: {
        create: data,
      },
    },
    select: {
      roles: true,
    },
  });
}

async function removeRole(id: string, roleId: string) {
  return await prisma.warehouse.update({
    where: {
      id: id,
    },
    data: {
      roles: {
        delete: {
          id: roleId,
        },
      },
    },
  });
}

async function updateRole(id: string, roleId: string, data: any) {
  return await prisma.warehouse.update({
    where: {
      id: id,
    },
    data: {
      roles: {
        update: {
          where: {
            id: roleId,
          },
          data: data,
        },
      },
    },
  });
}

async function getRoles(id: string) {
  return await prisma.warehouse.findUnique({
    where: {
      id: id,
    },
    select: {
      roles: true,
    },
  });
}

async function addHistory(id: string, data: any) {
  return await prisma.warehouse.update({
    where: {
      id: id,
    },
    data: {
      history: {
        create: data,
      },
    },
  });
}

async function getHistory(id: string) {
  const warehouse = await prisma.warehouse.findUnique({
    where: {
      id: id,
    },
    include: {
      history: true,
    },
  });
  return warehouse?.history;
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
  getProducts,
  addContext,
  removeContext,
  updateContext,
  changeContextRoles,
  getContexts,
  addRole,
  removeRole,
  updateRole,
  getRoles,
  addHistory,
  getHistory,
  getStatistics,
} as const;
