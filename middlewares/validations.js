export const userValidator = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  if (!userName || !password) {
    ctx.status = 400;
    return;
  } else await next();
};
