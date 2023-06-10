import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // const user = await prisma.user.create({
  //   data: {
  //     email: "email@wp.pl",
  //     username: "admin",
  //     password: "admin",
  //   },
  // });

  // const warehouse = await prisma.warehouse.create({
  //   data: {
  //     icon: "icon",
  //     name: "warehouse",
  //     contexts: {
  //       create: {
  //         user: {
  //           connect: {
  //             id: user.id,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const product = await prisma.product.create({
    data: {
      image: "image",
      name: "product",
      description: "description",
      tags: ["VEGETABLES"],
    },
  });

  // const role = await prisma.role.create({
  //   data: {
  //     name: "ADMIN",
  //     permissions: [
  //       "READ_PRODUCTS",
  //       "WRITE_PRODUCTS",
  //       "DELETE_PRODUCTS",
  //       "READ_WAREHOUSES",
  //       "WRITE_WAREHOUSES",
  //       "DELETE_WAREHOUSES",
  //       "READ_CONTEXTS",
  //       "WRITE_CONTEXTS",
  //       "DELETE_CONTEXTS",
  //       "READ_HISTORY",
  //       "READ_STATISTICS",
  //     ],
  //   },
  // });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
