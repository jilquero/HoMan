import prisma from "../../lib/prisma";

async function getAll() {
  return await prisma.product.findMany();
}

async function getById(id: string) {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
}

export default {
  getAll,
  getById,
} as const;
