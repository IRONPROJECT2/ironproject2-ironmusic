const User = require("../models/user.model");
const Band = require("../models/band.model");
const Atc = require("../models/anunciatuconcierto.model")
const mongoose = require('mongoose');
const createError = require("http-errors");

module.exports.index = (req, res, next) => {
  Promise.all([
    Band.find().sort({ created: -1 }).limit(5).exec(),
    Atc.find().sort({ date: 1 }).limit(5).exec()
  ])
  .then(([bands, concerts]) => {
    res.render("index", { bands, concerts });
  })
  .catch((error) => {
    next(error);
  });
}

// module.exports.index = (req, res, next) => {
//   res.render("index");
// }