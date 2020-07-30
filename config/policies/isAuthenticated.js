module.exports = async (ctx, next) => {
  if (ctx.state.user && ctx.state.user.role.name === 'Authenticated') {
    return await next();
  }

  ctx.unauthorized(`You're not logged in!`);
};
