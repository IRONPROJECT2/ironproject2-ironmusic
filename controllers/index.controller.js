const User = require("../models/user.model");
const Band = require("../models/band.model");
const Atc = require("../models/anunciatuconcierto.model")
const mongoose = require('mongoose');
const createError = require("http-errors");
const Rating = require("../models/rating.model");

module.exports.index = (req, res, next) => {
  const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; 
  Promise.all([
    Band.find().sort({ created: -1 }).limit(5).exec(),
    Band.find().sort({ rating: -1 }).limit(10).populate("members").exec(),
    Atc.find().sort({ date: 1 }).limit(6).exec()
  ])
  .then(([bands, rating, concerts]) => {
    res.render("index", { bands, rating, concerts, list });
  })
  .catch((error) => {
    next(error);
  });
}