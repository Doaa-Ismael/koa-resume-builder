const Router = require("@koa/router");

const { registerUser, loginUser } = require("./contoller");
const { API_URLS } = require("../../constants");

const userRouter = new Router();

userRouter.post(API_URLS.USER_REGISTER, registerUser);
userRouter.post(API_URLS.USER_LOGIN, loginUser);

module.exports = userRouter;
