require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const logger = require("morgan");

require("./configs/hbs.config");
require("./configs/db.config");

const app = express();
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(logger("dev"));

app.use(express.urlencoded());

const { session, loadUserSession } = require('./configs/session.config');
app.use(session);
app.use(loadUserSession);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

const routes = require("./configs/routes.config");

app.use("/", routes);

const port = 3000;
app.listen(port, () => console.info(`Listening on port ${port}`));