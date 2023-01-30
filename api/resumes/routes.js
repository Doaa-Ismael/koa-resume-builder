import Router from "@koa/router";
import passport from "koa-passport";

import { API_URLS } from "../../constants";
import { createResume, updateResume, getResume } from "./contoller";

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

resumeRouter.get(
  API_URLS.GET_RESUME,
  passport.authenticate("jwt", { session: false }),
  getResume
);

export default resumeRouter;
