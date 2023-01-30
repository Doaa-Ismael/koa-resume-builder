const { Resume } = require("../../models");

const createResume = async (ctx, user) => {
  try {
    const resume = await Resume.create({ user_id: user._id });
    ctx.status = 201;
    ctx.body = { resume };
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createResume,
};
