const Router = require("@koa/router");

const { registerUser, loginUser } = require("./contoller");
const { API_URLS } = require("../../constants");

const userRouter = new Router();

userRouter.post(API_URLS.REGISTER_USER, registerUser);
userRouter.post(API_URLS.LOGIN_USER, loginUser);

module.exports = userRouter;
