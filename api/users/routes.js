import Router from "@koa/router";

import { registerUser, loginUser } from "./contoller";
import { API_URLS } from "../../constants";

const userRouter = new Router();

userRouter.post(API_URLS.REGISTER_USER, registerUser);
userRouter.post(API_URLS.LOGIN_USER, loginUser);

export default userRouter;
