const request = require("supertest");

const { app } = require("../../../app");
const { API_URLS } = require("../../../constants");
const { Resume } = require("../../../models");

describe("Resume", () => {
  let token = "",
    user = null;
  beforeAll(async () => {
    // TODO: use random generator for mocked data
    const registrationResponse = await request(app.callback())
      .post(API_URLS.REGISTER_USER)
      .send({ userName: "John Doee", password: "12345678" });
    token = `BEARER ${registrationResponse.body.token}`;
    user = registrationResponse.body.user;
  });

  describe("POST", () => {
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
  });

  describe("PATCH", () => {
    it("should update resume to authenticated users", async () => {
      let updateResumeURL;
      const basicInfo = {
        name: "JOHN",
        headline: "Engineer",
        phone: "+20187346864",
      };
      const positions = [
        {
          title: "Engineer",
          description: "Did 123",
          startDate: "01/01/2020",
          endDate: "01/01/2021",
          organization: "Zyda",
        },
      ];
      const {
        body: { resume },
      } = await request(app.callback())
        .post(API_URLS.CREATE_RESUME)
        .set({ Authorization: token });
      updateResumeURL = API_URLS.UPDATE_RESUME.replace(":id", resume._id);
      const response1 = await request(app.callback())
        .patch(updateResumeURL)
        .set({ Authorization: token })
        .send({ basicInfo });
      let updatedResumeSections = response1.body.resume.sections;

      expect(response1.status).toEqual(200);
      expect(updatedResumeSections.basicInfo).toEqual(
        expect.objectContaining(basicInfo)
      );
      const response2 = await request(app.callback())
        .patch(updateResumeURL)
        .set({ Authorization: token })
        .send({ positions });
      updatedResumeSections = response2.body.resume.sections;
      expect(response2.status).toEqual(200);
      expect(updatedResumeSections.basicInfo).toEqual(
        expect.objectContaining(basicInfo)
      );
      expect(updatedResumeSections.positions).toEqual(
        expect.arrayContaining(positions)
      );
    });
  });

  describe("GET", () => {
    let resume;
    beforeAll(async () => {
      const response = await request(app.callback())
        .post(API_URLS.CREATE_RESUME)
        .set({ Authorization: token });
      resume = response.body.resume;
    });

    it("should get resume to authenticated users", async () => {
      const response = await request(app.callback())
        .get(API_URLS.GET_RESUME.replace(":id", resume._id))
        .set({ Authorization: token });
      expect(response.status).toEqual(200);
      expect(response.body.resume).toBeTruthy();
    });
  });
});
