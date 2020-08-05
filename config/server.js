/* eslint-disable */
module.exports = ({ env }) => ({
  host: env('HOST', '127.0.0.1'),
  port: env.int('PORT', 1337),
  url: process.env.MAIN_URL,
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET')
    }
  }
});
