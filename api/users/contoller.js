import User from "./../../models/User";
import { MongooseErrorCodes } from "../../constants";

export const registerUser = async (ctx) => {
  try {
    const user = await User.create(ctx.request.body);
    const token = user.generateToken();
    ctx.status = 201;
    ctx.body = {
      user: { ...user, password: null },
    };
    ctx.cookies.set("Authorization", `Bearer ${token}`, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(360000 + Date.now()),
    });
  } catch (e) {
    console.log({ e });
    if (e.code === MongooseErrorCodes.DUPLICATE_RECORD) {
      ctx.status = 409;
    } else {
      ctx.status = 400;
    }
  }
};

export const loginUser = async (ctx) => {
  const { userName, password } = ctx.request.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      ctx.status = 401;
      return;
    }
    const isMatching = await user.comparePassword(password);

    if (!isMatching) {
      ctx.status = 401;
    } else {
      const token = user.generateToken();
      ctx.status = 200;
      ctx.cookies.set("Authorization", `Bearer ${token}`, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(360000 + Date.now()),
      });
    }
  } catch (e) {
    console.log(e);
    ctx.status = 400;
  }
};
