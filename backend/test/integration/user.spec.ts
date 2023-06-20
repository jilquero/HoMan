import { afterAll, beforeAll, describe, expect, test } from "vitest";
import supertest from "supertest";
// import { MongoMemoryReplSet, MongoMemoryServer } from "mongodb-memory-server";

import app from "../../src/server";

// let mongod;

// beforeAll(async () => {
//   mongod = await MongoMemoryReplSet.create({ replSet: { count: 4 } });
//   const uri = mongod.getUri();
//   process.env.DATABASE_URL = uri;
// });

// afterAll(async () => {
//   await mongod.stop();
// });

describe("should create user edit it and delete", () => {
  let token: string;
  let location: string;

  test("should create a user", async () => {
    const res = await supertest(app).post("/users").send({
      image: "string",
      username: "string",
      firstName: "string",
      lastName: "string",
      email: "email@wp.pl",
      password: "Mypassword1!.",
      phone: "111111111",
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.headers["location"]).toBeDefined();
    location = res.headers["location"];
    token = res.body.token;
  });

  test("duplicate user", async () => {
    const res = await supertest(app).post("/users").send({
      image: "string",
      username: "string",
      firstName: "string",
      lastName: "string",
      email: "email@wp.pl",
      password: "Mypassword1!.",
      phone: "111111111",
    });
    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({ msg: "user already exists" });
  });

  test("invalid email", async () => {
    const res = await supertest(app).post("/users").send({});
    expect(res.status).toBe(400);
  });

  test("should edit user", async () => {
    const res = await supertest(app)
      .patch(`/users/${location}`)
      .send({
        firstName: "yikes",
        lastName: "yikes",
        phone: "111111111",
      })
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(res.body.user.firstName).toBe("yikes");
    expect(res.body.user.lastName).toBe("yikes");
    expect(res.body.user.phone).toBe("111111111");
  });

  test("should delete user", async () => {
    const res = await supertest(app)
      .delete(`/users/${location}`)
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ msg: "user deleted" });
  });
});

// test("ping", async () => {
//   const res = await supertest(app).get("/ping");
//   expect(res.status).toBe(200);
//   expect(res.body).toStrictEqual({ msg: "pong" });
// });

// describe("products", async () => {
//   test("should fetch products", async () => {
//     const res = await supertest(app).get("/products");
//     expect(res.status).toBe(200);
//     expect(res.body).toStrictEqual({ products: [] });
//   });
// });

// describe("users", async () => {
//   test("should create a user", async () => {
//     const res = await supertest(app).post("/users").send({
//       image: "string",
//       username: "string",
//       firstName: "string",
//       lastName: "string",
//       email: "email@wp.pl",
//       password: "Mypassword1!.",
//       phone: "111111111",
//     });
//     expect(res.status).toBe(201);
//     console.log(res.body);
//   });

//   test("duplicate user", async () => {
//     const res = await supertest(app).post("/users").send({
//       image: "string",
//       username: "string",
//       firstName: "string",
//       lastName: "string",
//       email: "email@wp.pl",
//       password: "Mypassword1!.",
//       phone: "111111111",
//     });
//     expect(res.status).toBe(400);
//     expect(res.body).toStrictEqual({ msg: "user already exists" });
//   });

//   test("invalid email", async () => {
//     const res = await supertest(app).post("/users").send();
//     expect(res.status).toBe(400);
//   });
// });

// describe("edit", async () => {
//   test("should edit user", async () => {
//     const res = await supertest(app).patch("/users").send({
//       firstName: "yikes",
//       lastName: "yikes",
//       phone: "111111111",
//     });
//     expect(res.status).toBe(200);
//     expect(res.body.user.firstName).toBe("yikes");
//     expect(res.body.user.lastName).toBe("yikes");
//     expect(res.body.user.phone).toBe("111111111");
//   });

//   // test("should not edit user", async () => {
//   //   const res = await supertest(app).patch("/users").send({
//   //     firstName: "yikes",
//   //     lastName: "yikes",
//   //     phone: "111111111",
//   //   });
//   //   expect(res.status).toBe(401);
//   // });
// });
