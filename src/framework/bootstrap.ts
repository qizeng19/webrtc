import * as Sentry from '@sentry/browser';
wx.miniProgram.getEnv(function(res) {
  console.log(res.miniprogram); // true
  window.isWX = res.miniprogram;
});
process.env.SENTRY_URL && Sentry.init({ dsn: process.env.SENTRY_URL });
