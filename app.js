const Koa = require("koa");
const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const passport = require("koa-passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const dotEnv = require("dotenv");

dotEnv.config();

const userRouter = require("./api/users/routes");

const app = new Koa();
const router = new Router();

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

// routes
app.use(userRouter.routes());

module.exports = {
  app,
  router,
};
