import prisma from "../../lib/prisma";

export async function getRoleByName(name) {
  return await prisma.role.findUnique({
    where: {
      name: name,
    },
  });
}
