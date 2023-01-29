const Koa = require("koa");
const Router = require("@koa/router");
const { koaBody } = require("koa-body");

const userRouter = require("./api/users/routes");

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(userRouter.routes());

module.exports = {
  app,
  router,
};
