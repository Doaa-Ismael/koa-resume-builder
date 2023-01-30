const request = require("supertest");

const { app } = require("../../../app");
const { API_URLS } = require("../../../constants");
const { Resume } = require("../../../models");

describe("Resume", () => {
  describe("POST", () => {
    let token = "",
      user = null;
    beforeAll(async () => {
      // We should user random generator for mocked data
      const registrationResponse = await request(app.callback())
        .post(API_URLS.USER_REGISTER)
        .send({ userName: "John Doee", password: "12345678" });
      token = `BEARER ${registrationResponse.body.token}`;
      user = registrationResponse.body.user;
    });

    it("should create resume to authenticated users", async () => {
      const response = await request(app.callback())
        .post(API_URLS.CREATE_RESUME)
        .set({ Authorization: token });
      expect(response.status).toEqual(201);
      const userResumes = await Resume.find({ user_id: user._id });
      expect(userResumes.length).toEqual(1);
    });

    it("should not create resume to unauthenticated users", async () => {
      const response = await request(app.callback()).post(
        API_URLS.CREATE_RESUME
      );
      expect(response.status).toEqual(401);
    });

    it.todo("should update resume to authenticated users");

    it.todo("should get resume to authenticated users");
  });
});
