const User = require("./../../models/User");
const { MongooseErrorCodes } = require("../../constants");

const registerUser = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  if (!userName || !password) {
    ctx.status = 400;
    return next();
  }

  try {
    const user = await User.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = { token: user.generateToken() };
  } catch (e) {
    console.log({ e });
    if (e.code === MongooseErrorCodes.DUPLICATE_RECORD) {
      ctx.status = 409;
    } else {
      ctx.status = 400;
    }
  }
};

const loginUser = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  if (!userName || !password) {
    ctx.status = 400;
    return next();
  }

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      ctx.status = 401;
      return next();
    }
    const isMatching = await user.comparePassword(password);

    if (!isMatching) {
      ctx.status = 401;
    } else {
      ctx.status = 200;
      ctx.body = { token: user.generateToken() };
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
