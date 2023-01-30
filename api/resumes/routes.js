const Router = require("@koa/router");
const passport = require("koa-passport");

const { API_URLS } = require("../../constants");
const { createResume, updateResume } = require("./contoller");

const resumeRouter = new Router();

resumeRouter.post(
  API_URLS.CREATE_RESUME,
  passport.authenticate("jwt", { session: false }),
  createResume
);

resumeRouter.patch(
  API_URLS.UPDATE_RESUME,
  passport.authenticate("jwt", { session: false }),
  updateResume
);

module.exports = resumeRouter;
