const Router = require("@koa/router");
const passport = require("koa-passport");

const { API_URLS } = require("../../constants");
const { Resume } = require("../../models");

const resumeRouter = new Router();

resumeRouter.post(
  API_URLS.CREATE_RESUME,
  passport.authenticate("jwt", { session: false }),
  async (ctx, user) => {
    try {
      const resume = await Resume.create({ user_id: user._id });
      ctx.status = 201;
      ctx.body = { resume };
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = resumeRouter;
