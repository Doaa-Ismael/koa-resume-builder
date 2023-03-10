import request from "supertest";

import { app } from "../../../app";
import { API_URLS } from "../../../constants";
import { appendPrefix } from "../../../utils/testsHelpers.js";

describe("User API", () => {
  describe("Register", () => {
    it("should create the user if name and password are valid", async () => {
      const response = await request(app.callback())
        .post(appendPrefix(API_URLS.REGISTER_USER))
        .send({ userName: "John", password: "12345678" });
      expect(response.status).toEqual(201);
      expect(response.headers["set-cookie"].length).toEqual(1);
    });

    it("should return 400 if data is missing", async () => {
      const response = await request(app.callback())
        .post(appendPrefix(API_URLS.REGISTER_USER))
        .send({ password: "12345678" });
      expect(response.status).toEqual(400);
    });

    it("should return 400 if data is invalid", async () => {
      const response = await request(app.callback())
        .post(appendPrefix(API_URLS.REGISTER_USER))
        .send({ userName: "John", password: "12678" });
      expect(response.status).toEqual(400);
    });

    it("should return 409 if name is already taken", async () => {
      const user = { userName: "new user", password: "12345678" };
      const response1 = await request(app.callback())
        .post(appendPrefix(API_URLS.REGISTER_USER))
        .send(user);
      expect(response1.status).toEqual(201);
      const response2 = await request(app.callback())
        .post(appendPrefix(API_URLS.REGISTER_USER))
        .send(user);
      expect(response2.status).toEqual(409);
    });
  });

  describe("Login", () => {
    const user = { userName: "John Doe", password: "12345678" };

    beforeAll(async () => {
      await request(app.callback())
        .post(appendPrefix(API_URLS.REGISTER_USER))
        .send(user);
    });

    it("should login successfully with valid credentials", async () => {
      const response = await request(app.callback())
        .post(appendPrefix(API_URLS.LOGIN_USER))
        .send(user);

      expect(response.status).toEqual(200);
      expect(response.headers["set-cookie"].length).toEqual(1);
    });

    it("should not login if the credentials is invalid", async () => {
      const response = await request(app.callback())
        .post(appendPrefix(API_URLS.LOGIN_USER))
        .send({ ...user, password: "hh" });

      expect(response.status).toEqual(401);
      expect(response.headers["set-cookie"]).toBeFalsy();
    });

    it("should not login if the credentials is missing", async () => {
      const response = await request(app.callback())
        .post(appendPrefix(API_URLS.LOGIN_USER))
        .send({ ...user, password: null });

      expect(response.status).toEqual(400);
      expect(response.headers["set-cookie"]).toBeFalsy();
    });
  });
});
