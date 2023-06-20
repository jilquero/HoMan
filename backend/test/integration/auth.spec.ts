import { afterAll, beforeAll, describe, expect, test } from "vitest";
import supertest from "supertest";
import app from "../../src/server";

beforeAll(async () => {
  const res = await supertest(app).post("/users").send({
    image: "auth",
    username: "auth",
    firstName: "auth",
    lastName: "auth",
    email: "auth@wp.pl",
    password: "Mypassword1!.",
  });
  expect(res.status).toBe(201);
});

describe("auth", async () => {
  let token: string;

  test("should login", async () => {
    const res = await supertest(app).post("/auth/login").send({
      email: "auth@wp.pl",
      password: "Mypassword1!.",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test("should logout", async () => {
    const res = await supertest(app)
      .post("/auth/logout")
      .set("Authorization", token);
    expect(res.status).toBe(200);
  });

  test("should not login", async () => {
    const res = await supertest(app).post("/auth/login").send({
      email: "oof",
      password: "loool",
    });
    expect(res.status).toBe(401);
  });
});
