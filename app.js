import Koa from "koa";
import { koaBody } from "koa-body";
import passport from "koa-passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotEnv from "dotenv";
import Router from "@koa/router";

dotEnv.config();

import userRouter from "./api/users/routes";
import resumeRouter from "./api/resumes/routes";
import { API_PREFIX } from "./constants/urls.js";

export const app = new Koa();
const apiRouter = new Router({
  prefix: API_PREFIX,
});

const passportOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

// middlewares
app.use(koaBody());
app.use(passport.initialize());
passport.use(
  new Strategy(passportOptions, (jwt_payload, next) => {
    if (jwt_payload) next(null, jwt_payload);
    else next(null, false);
  })
);
passport.serializeUser((user, next) => next(null, user));
passport.deserializeUser((obj, next) => next(null, obj));
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

// routes
apiRouter.use(
  userRouter.routes(),
  userRouter.allowedMethods(),
  resumeRouter.routes(),
  resumeRouter.allowedMethods()
);
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
