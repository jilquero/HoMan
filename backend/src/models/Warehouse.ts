import { z } from "zod";

export const warehouseValidationSchema = z.object({
  id: z.string(),
  icon: z.string().min(2).trim(),
  name: z.string().min(2).trim(),
  products: z.array(z.string()).optional(),
  contexts: z.array(z.string()).optional(),
  roles: z.array(z.string()).optional(),
  history: z.array(z.string()).optional(),
});

export const newWarehouseValidationSchema = z.object({
  icon: z.string().min(2).trim(),
  name: z.string().min(2).trim(),
});

export const editWarehouseValidationSchema = z
  .object({
    icon: z.string().min(2).trim().optional(),
    name: z.string().min(2).trim().optional(),
  })
  .refine(({ icon, name }) => icon || name, {
    message: "Atl least one field is required",
  });

export type Warehouse = z.infer<typeof warehouseValidationSchema>;
export type NewWarehouse = z.infer<typeof newWarehouseValidationSchema>;
export type EditWarehouse = z.infer<typeof editWarehouseValidationSchema>;

export const warehouseProductValidationSchema = z.object({
  id: z.string(),
  productId: z.string().optional(),
  name: z.string().min(2).trim(),
  description: z.string().min(2).trim(),
  barcode: z.string().min(2).trim(),
  tags: z.array(z.string()),
  quantity: z.number().int().positive(),
  minimumQuantity: z.number().int().positive().optional(),
  prefferedQuantity: z.number().int().positive().optional(),
  warehouseId: z.string(),
});

export const newWarehouseProductValidationSchema = z
  .object({
    productId: z.string().optional(),
    name: z.string().min(2).trim().optional(),
    description: z.string().min(2).trim().optional(),
    barcode: z.string().min(2).trim().optional(),
    tags: z.array(z.string()).optional(),
    quantity: z.number().int().positive().optional(),
    minimumQuantity: z.number().int().positive().optional(),
    prefferedQuantity: z.number().int().positive().optional(),
    warehouseId: z.string().optional(),
  })
  .refine(
    ({
      productId,
      name,
      description,
      barcode,
      tags,
      quantity,
      minimumQuantity,
      prefferedQuantity,
      warehouseId,
    }) =>
      productId ||
      (name &&
        description &&
        barcode &&
        tags &&
        quantity &&
        minimumQuantity &&
        prefferedQuantity &&
        warehouseId),
    { message: "ProductId is required or everything else" }
  );

export const editWarehouseProductValidationSchema = z.object({
  productId: z.string().optional(),
  name: z.string().min(2).trim().optional(),
  description: z.string().min(2).trim().optional(),
  barcode: z.string().min(2).trim().optional(),
  tags: z.array(z.string()).optional(),
  quantity: z.number().int().positive().optional(),
  minimumQuantity: z.number().int().positive().optional(),
  prefferedQuantity: z.number().int().positive().optional(),
  warehouseId: z.string().optional(),
});

export type WarehouseProduct = z.infer<typeof warehouseProductValidationSchema>;
export type NewWarehouseProduct = z.infer<
  typeof newWarehouseProductValidationSchema
>;
export type EditWarehouseProduct = z.infer<
  typeof editWarehouseProductValidationSchema
>;

export const warehouseContextValidationSchema = z.object({
  id: z.string(),
  warehouseId: z.string(),
  userId: z.string(),
  roles: z.array(z.string().min(2).trim()),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
});

export const newWarehouseContextValidationSchema = z.object({
  userId: z.string(),
  roles: z.array(z.string().min(2).trim()),
  status: z.enum(["PENDING"]).default("PENDING"),
});

export const editWarehouseContextValidationSchema = z.object({
  userId: z.string().optional(),
  roles: z.array(z.string().min(2).trim()).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const ContextStatus = z.enum(["ACTIVE", "INACTIVE", "PENDING"]);

export type WarehouseContext = z.infer<typeof warehouseContextValidationSchema>;
export type NewWarehouseContext = z.infer<
  typeof newWarehouseContextValidationSchema
>;
export type EditWarehouseContext = z.infer<
  typeof editWarehouseContextValidationSchema
>;
export type ContextStatus = z.infer<typeof ContextStatus>;

export const warehouseHistoryValidationSchema = z.object({
  id: z.string(),
  action: z.string().min(2).trim(),
  targetCtxId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive().optional(),
  contextId: z.string(),
  warehouseId: z.string(),
});

export const newWarehouseHistoryValidationSchema = z.object({
  action: z.string().min(2).trim(),
  targetCtxId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive().optional(),
  contextId: z.string(),
  warehouseId: z.string(),
});

export type WarehouseHistory = z.infer<typeof warehouseHistoryValidationSchema>;
export type NewWarehouseHistory = z.infer<
  typeof newWarehouseHistoryValidationSchema
>;

export const Permission = z.enum([
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
]);

export type Permission = z.infer<typeof Permission>;

// // **** Variables **** //

// const INVALID_CONSTRUCTOR_PARAM =
//   "nameOrObj arg must a string or an " +
//   "object with the appropriate user keys.";

// // **** Types **** //

// export interface IWarehouse {
//   id: number;
//   name: string;
//   email: string;
//   pwdHash?: string;
// }

// // **** Functions **** //

// /**
//  * Create new User.
//  */
// function new_(
//   name?: string,
//   email?: string,
//   pwdHash?: string,
//   id?: number // id last cause usually set by db
// ): IWarehouse {
//   return {
//     id: id ?? -1,
//     name: name ?? "",
//     email: email ?? "",
//     pwdHash: pwdHash ?? "",
//   };
// }

// /**
//  * Get user instance from object.
//  */
// function from(param: object): IWarehouse {
//   // Check is user
//   if (!isWarehouse(param)) {
//     throw new Error(INVALID_CONSTRUCTOR_PARAM);
//   }
//   // Get user instance
//   const p = param as IWarehouse;
//   return new_(p.name, p.email);
// }

// /**
//  * See if the param meets criteria to be a user.
//  */
// function isWarehouse(arg: unknown): boolean {
//   return (
//     !!arg &&
//     typeof arg === "object" &&
//     "id" in arg &&
//     "email" in arg &&
//     "name" in arg &&
//     "role" in arg
//   );
// }

// export default {
//   new: new_,
// } as const;
