const request = require("supertest");

const { app } = require("../../../app");

describe("User API", () => {
  let server;
  beforeEach(() => {
    server = app.listen(3001);
  });
  afterEach(() => {
    server.close();
  });

  it("should create the user if name and password are valid", async () => {
    const response = await request(app.callback())
      .post("/users/register")
      .send({ userName: "John", password: "12345678" });
    expect(response.status).toEqual(201);
    // expect(response.body.token).toBeTruthy();
  });

  it("should return 400 if data is missing", async () => {
    const response = await request(app.callback())
      .post("/users/register")
      .send({ password: "12345678" });
    expect(response.status).toEqual(400);
  });

  it("should return 400 if data is invalid", async () => {
    const response = await request(app.callback())
      .post("/users/register")
      .send({ userName: "John", password: "12678" });
    expect(response.status).toEqual(400);
  });

  it("should return 409 if name is already taken", async () => {
    const user = { userName: "new user", password: "12345678" };
    const response1 = await request(app.callback())
      .post("/users/register")
      .send(user);
    expect(response1.status).toEqual(201);
    const response2 = await request(app.callback())
      .post("/users/register")
      .send(user);
    expect(response2.status).toEqual(409);
  });
});
