import { z } from "zod";
import { warehouseContextValidationSchema } from "./Warehouse";

export const userValidationSchema = z.object({
  id: z.string(),
  email: z.string().email().min(2).max(30).trim(),
  username: z.string().min(2).max(30).trim(),
  password: z.string().min(2).trim(),
  firstName: z.string().min(2).max(30).trim().optional(),
  lastName: z.string().min(2).max(30).trim().optional(),
  image: z.string().min(2).max(30).trim().optional(),
  phone: z.string().min(2).max(30).trim().optional(),
  contexts: z.array(warehouseContextValidationSchema).optional(),
});

export const newUserValidationSchema = z.object({
  email: z.string().email().min(2).max(30).trim(),
  username: z.string().min(2).max(30).trim(),
  password: z.string().min(2).trim(),
  firstName: z.string().min(2).max(30).trim().optional(),
  lastName: z.string().min(2).max(30).trim().optional(),
  image: z.string().min(2).max(30).trim().optional(),
  phone: z.string().min(2).max(30).trim().optional(),
});

export const editUserValidationSchema = z
  .object({
    email: z.string().email().min(2).max(30).trim().optional(),
    username: z.string().min(2).max(30).max(30).trim().optional(),
    password: z.string().min(2).trim().optional(),
    firstName: z.string().min(2).max(30).trim().optional(),
    lastName: z.string().min(2).max(30).trim().optional(),
    image: z.string().min(2).max(30).trim().optional(),
    phone: z.string().min(2).max(30).trim().optional(),
  })
  .refine(
    ({ email, username, password, firstName, lastName, image, phone }) =>
      email || username || password || firstName || lastName || image || phone,
    { message: "Atl least one field is required" }
  );

export type User = z.infer<typeof userValidationSchema>;
export type NewUser = z.infer<typeof newUserValidationSchema>;
export type EditUser = z.infer<typeof editUserValidationSchema>;

// // **** Variables **** //

// const INVALID_CONSTRUCTOR_PARAM =
//   "nameOrObj arg must a string or an " +
//   "object with the appropriate user keys.";

// // export enum UserRoles {
// //   Standard,
// //   Admin,
// // }

// // **** Types **** //

// export interface IUser {
//   id: number;
//   name: string;
//   email: string;
//   username: string;
//   pwdHash?: string;
//   firstName?: string;
//   lastName?: string;
//   image?: string;
//   phone?: string;
// }

// export interface ISessionUser {
//   id: number;
//   email: string;
//   name: string;
// }

// // **** Functions **** //

// /**
//  * Create new User.
//  */
// function new_(
//   name?: string,
//   email?: string,
//   pwdHash?: string,
//   username?: string,
//   firstName?: string,
//   lastName?: string,
//   image?: string,
//   phone?: string,
//   id?: number // id last cause usually set by db
// ): IUser {
//   return {
//     id: id ?? -1,
//     name: name ?? "",
//     email: email ?? "",
//     pwdHash: pwdHash ?? "",
//     username: username ?? "",
//     firstName: firstName ?? "",
//     lastName: lastName ?? "",
//     image: image ?? "",
//     phone: phone ?? "",
//   };
// }

// /**
//  * Get user instance from object.
//  */
// function from(param: object): IUser {
//   // Check is user
//   if (!isUser(param)) {
//     throw new Error(INVALID_CONSTRUCTOR_PARAM);
//   }
//   // Get user instance
//   const p = param as IUser;
//   return new_(
//     p.name,
//     p.email,
//     p.pwdHash,
//     p.username,
//     p.firstName,
//     p.lastName,
//     p.image,
//     p.phone,
//     p.id
//   );
// }

// /**
//  * See if the param meets criteria to be a user.
//  */
// function isUser(arg: unknown): boolean {
//   return (
//     !!arg &&
//     typeof arg === "object" &&
//     "id" in arg &&
//     "email" in arg &&
//     "name" in arg &&
//     "role" in arg
//   );
// }

// // **** Export default **** //

// export default {
//   new: new_,
//   from,
//   isUser,
// } as const;

// import * as Either from "fp-ts/Either";
// import type { Opaque } from "type-fest";
// import { z } from "zod";

// // Validation rules
// export const userValidationSchema = z.object({
//   id: z.string(),
//   fullName: z.string().min(2).max(30).trim(),
//   email: z.string().email(),
//   emailVerifiedAt: z.date(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// // Opaque types are used to prevent accidental type coercion
// export type User = Opaque<z.infer<typeof userValidationSchema>, "User">;

// // 1. Parse don't validate
// // 2. Handle error as an Either.left
// export function parseUser(value: unknown): Either.Either<Error, User> {
//   return Either.tryCatch(
//     () => userValidationSchema.parse(value) as User,
//     (error) => new Error(error.message)
//   );
// }
