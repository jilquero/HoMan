// import { afterAll, beforeAll, describe, expect, test } from "vitest";
// import supertest from "supertest";
// import app from "../../src/server";

// // Using request.agent() is the key
// var agent = supertest.agent(app);

// beforeAll(async () => {
//   const admin = await supertest(app).post("/users").send({
//     image: "admin",
//     username: "admin",
//     firstName: "admin",
//     lastName: "admin",
//     email: "admin@wp.pl",
//     password: "Mypassword1!.",
//   });
//   expect(admin.status).toBe(201);

//   const user = await supertest(app).post("/users").send({
//     image: "user",
//     username: "user",
//     firstName: "user",
//     lastName: "user",
//     email: "user@wp.pl",
//     password: "Mypassword1!.",
//   });
//   expect(user.status).toBe(201);

//   const outsider = await supertest(app).post("/users").send({
//     image: "outsider",
//     username: "outsider",
//     firstName: "outsider",
//     lastName: "outsider",
//     email: "outsider@wp.pl",
//     password: "Mypassword1!.",
//   });
//   expect(outsider.status).toBe(201);
// });

// describe("create", async () => {
//   let token: string;
//   let location: string;

//   test("should login", async () => {
//     const res = await supertest(app).post("/auth/login").send({
//       email: "email@wp.pl",
//       password: "Mypassword1!.",
//     });
//     expect(res.status).toBe(200);
//     expect(res.body.token).toBeDefined();
//     token = res.body.token;
//   });

//   test("should create warehouse", async () => {
//     const res = await agent
//       .post("/warehouses")
//       .send({
//         icon: "icon",
//         name: "Home",
//       })
//       .set("Authorization", token);
//     expect(res.status).toBe(200);
//     expect(res.body.warehouse).toBeDefined();
//   });
// });
