import { EditUser, NewUser } from "../models/User";
import UserRepository from "../repository/UserRepository";
import PwdUtil from "../util/PwdUtil";
import WarehouseService from "./WarehouseService";

async function getByEmail(email: string) {
  return await UserRepository.getByEmail(email);
}

async function getById(id: string) {
  return await UserRepository.getById(id);
}

async function create(data: NewUser) {
  data.password = await PwdUtil.getHash(data.password);
  return await UserRepository.create(data);
}

async function update(id: string, data: EditUser) {
  if (data.password) {
    data.password = await PwdUtil.getHash(data.password);
  }
  return await UserRepository.update(id, data);
}

async function deleteById(id: string) {
  const user = await UserRepository.getById(id);
  const contexts = user?.contexts;
  contexts?.forEach(async (c) => {
    await WarehouseService.updateContext(id, c.warehouseId, c.id, {
      status: "INACTIVE",
    });
  });
  return await UserRepository.deleteById(id);
}

export default {
  getByEmail,
  getById,
  create,
  update,
  deleteById,
} as const;
