const express = require("express");
const logger = require("morgan");

const app = express();
const loginRouter = require("./routes/login");

require("./utils/configureAuth");
const setProxy = require("./utils/proxy")(app);

app.use(logger("dev"));

app.use("/api/login", loginRouter);
setProxy("/api/users", "http://localhost:3000/", { requiresAuth: true });
setProxy("/api/tasks", "http://localhost:3003/", { requiresAuth: true });
setProxy("/", "http://localhost:4000/", { removeBasePath: false });

module.exports = app;
