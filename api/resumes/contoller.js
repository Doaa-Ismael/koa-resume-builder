const { Resume } = require("../../models");

const createResume = async (ctx, user) => {
  try {
    const resume = await Resume.create({ user_id: user._id });
    ctx.status = 201;
    ctx.body = { resume };
  } catch (e) {
    ctx.status = 400;
    console.log(e);
  }
};

const updateResume = async (ctx) => {
  const resumeId = ctx.params.id;
  try {
    const resume = await Resume.findById(resumeId);
    Object.assign(resume["sections"], ctx.request.body);
    const updatedResume = await resume.save();
    ctx.status = 200;
    ctx.body = { resume: updatedResume };
  } catch (e) {
    ctx.status = 400;
    console.log(e);
  }
};

const getResume = async (ctx, user) => {
  try {
    const resume = await Resume.findOne({
      user_id: user._id,
      _id: ctx.params.id,
    });
    ctx.status = 200;
    ctx.body = { resume };
  } catch (e) {
    ctx.status = 401;
    console.log(e);
  }
};

module.exports = {
  createResume,
  updateResume,
  getResume,
};
