const User = require("../models/user.model");
const Band = require("../models/band.model");
const Atc = require("../models/anunciatuconcierto.model")
const mongoose = require('mongoose');
const createError = require("http-errors");
const Rating = require("../models/rating.model");

module.exports.index = (req, res, next) => {
  
  Promise.all([
    Band.find().sort({ created: -1 }).limit(5).exec(),
    Band.find().sort({ rating: -1 }).limit(10).exec(),
    Atc.find().sort({ date: 1 }).limit(4).exec()
  ])
  .then(([bands,rating, concerts]) => {
    res.render("index", { bands, rating, concerts });
  })
  .catch((error) => {
    next(error);
  });
}