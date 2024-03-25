require("dotenv").config();
require("../configs/db.config");
const Band = require("../models/band.model");
const User = require("../models/user.model");
const Bandjam = require("../models/bandjam.model");
const FormarBanda = require("../models/formarbanda.model");
const Atc = require("../models/anunciatuconcierto.model");
const Messages = require("../models/message.model");

const dataUser = require("../data/users.json");
const dataBand = require("../data/bands.json");
const dataFormarBanda = require("../data/formarBanda.json");
const bandjam = require("../data/bandjam.json");
const atc = require("../data/atc.json");


// User.create(dataUser)
//   .then((user) => console.debug(`${user.length} users created`))
//   .catch((error) => next(error));

// Band.create(dataBand)
//   .then((user) => console.debug(`${user.length} users created`))
//   .catch((error) => next(error));

// FormarBanda.create(dataFormarBanda)
//   .then((user) => console.debug(`${user.length} users created`))
//   .catch((error) => next(error));

// Bandjam.create(bandjam)
//   .then((user) => console.debug(`${user.length} users created`))
//   .catch((error) => next(error));

// Atc.create(atc)
//   .then((user) => console.debug(`${user.length} users created`))
//   .catch((error) => next(error));




