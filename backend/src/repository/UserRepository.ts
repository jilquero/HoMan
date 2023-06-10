import prisma from "../../lib/prisma";
import { EditUser, NewUser, User, userValidationSchema } from "../models/User";
import Logger from "../util/Logger";

async function getByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  // return userValidationSchema.nullable().parse(user);
  return user;
}

async function getById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      contexts: true,
    },
  });
  // return userValidationSchema.nullable().parse(user)
  return user;
}

async function create(data: NewUser) {
  const user = await prisma.user.create({
    data: data,
  });
  // return userValidationSchema.parse(user);
  return user;
}

async function update(id: string, data: EditUser) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
  // return userValidationSchema.nullable().parse(user);
  return user;
}

async function deleteById(id: string) {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getByEmail,
  getById,
  create,
  update,
  deleteById,
} as const;
