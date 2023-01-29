const Router = require("@koa/router");

const { registerUser } = require("./contoller");

const userRouter = new Router();
userRouter.post("/users/register", registerUser);

module.exports = userRouter;
