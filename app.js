import Koa from "koa";
import { koaBody } from "koa-body";
import passport from "koa-passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotEnv from "dotenv";

dotEnv.config();

import userRouter from "./api/users/routes";
import resumeRouter from "./api/resumes/routes";

export const app = new Koa();

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

// routes
app.use(userRouter.routes());
app.use(resumeRouter.routes());
