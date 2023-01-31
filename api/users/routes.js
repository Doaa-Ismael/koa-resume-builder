import Router from "@koa/router";

import { registerUser, loginUser } from "./contoller";
import { API_URLS } from "../../constants";
import { userValidator } from "../../middlewares/validations.js";

const userRouter = new Router();

userRouter.post(API_URLS.REGISTER_USER, userValidator, registerUser);
userRouter.post(API_URLS.LOGIN_USER, userValidator, loginUser);

export default userRouter;
