const User = require("./../../models/User");
const { MongooseErrorCodes } = require("../../constants");

const registerUser = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  if (!userName || !password) {
    ctx.status = 400;
    return next();
  }

  try {
    await User.create(ctx.request.body);
    ctx.status = 201;
  } catch (e) {
    if (e.code === MongooseErrorCodes.DUPLICATE_RECORD) {
      ctx.status = 409;
    } else {
      ctx.status = 400;
    }
  }
};

module.exports = {
  registerUser,
};
