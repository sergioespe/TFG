const { createProxyMiddleware } = require("http-proxy-middleware");
const passport = require("passport");

module.exports =
  (app) =>
  (
    originUrl,
    destinationUrl,
    { removeBasePath = true, requiresAuth = false } = {}
  ) => {
    const options = {
      target: destinationUrl,
      changeOrigin: true,
    };
    if (removeBasePath)
      options.pathRewrite = {
        [`^${originUrl}`]: "/", // remove base path
      };

    if (requiresAuth) {
      app.use(
        originUrl,
        passport.authenticate("jwt", { session: false }),
        createProxyMiddleware(options)
      );
    } else {
      app.use(originUrl, createProxyMiddleware(options));
    }
  };
