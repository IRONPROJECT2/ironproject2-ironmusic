require("dotenv").config();
require("../configs/db.config");
const Band = require("../models/band.model");
const User = require("../models/user.model");
const dataUser = require("../data/users.json");
const dataBand = require("../data/bands.json");

// User.create(dataUser)
//   .then((user) => console.debug(`${user.length} users created`))
//   .catch((error) => next(error));

Band.create(dataBand)
  .then((user) => console.debug(`${user.length} users created`))
  .catch((error) => next(error));

