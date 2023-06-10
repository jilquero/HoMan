import prisma from "../../lib/prisma";
import ProductsRepository from "../repository/ProductsRepository";

async function getAll() {
  return await ProductsRepository.getAll();
}

async function getById(id: string) {
  return await ProductsRepository.getById(id);
}

export default {
  getAll,
  getById,
} as const;
