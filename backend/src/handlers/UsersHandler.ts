import HttpStatusCodes from "../constants/HttpStatusCodes";
import Logger from "../util/Logger";
import {
  EditUser,
  NewUser,
  editUserValidationSchema,
  newUserValidationSchema,
} from "../models/User";
import UserService from "../services/UserService";
import BearerUtil from "../util/BearerUtil";

export async function createUser(c, req, res) {
  const exists = await UserService.getByEmail(c.request.body.email);
  if (exists) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ msg: "user already exists" });
  }
  const newUser: NewUser = newUserValidationSchema.parse(c.request.body);
  const user = await UserService.create(newUser);
  res.setHeader("location", user.id).status(HttpStatusCodes.CREATED);
  return BearerUtil.addSessionData(res, {
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

export async function getLoggedInUser(c, req, res) {
  const userId = c.user.id;
  const user = await UserService.getById(userId);
  return res.status(HttpStatusCodes.OK).json({ user: user });
}

export async function getUser(c, req, res) {
  const user = await UserService.getById(c.request.params.userId);
  return res.status(HttpStatusCodes.OK).json({ user: user });
}

export async function updateUser(c, req, res) {
  const { userId } = c.request.params;
  if (userId !== c.user.id) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "unauthorized" });
  }

  const editUser: EditUser = editUserValidationSchema.parse(c.request.body);
  const user = await UserService.update(userId, editUser);
  return res.status(HttpStatusCodes.OK).json({ user: user });
}

export async function deleteUser(c, req, res) {
  const { userId } = c.request.params;
  if (userId !== c.user.id) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "unauthorized" });
  }
  await UserService.deleteById(userId);
  return res.status(HttpStatusCodes.OK).json({ msg: "user deleted" });
}

export const usersHandlers = {
  createUser,
  getLoggedInUser,
  getUser,
  updateUser,
  deleteUser,
};
