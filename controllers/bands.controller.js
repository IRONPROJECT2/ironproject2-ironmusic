const Band = require("../models/band.model");
const mongoose = require('mongoose');
const createError = require("http-errors");


module.exports.create = (req, res, next) => res.render("bands/registerBand");

module.exports.doCreate = (req, res, next) => {
  const bandUser = req.body;
  bandUser.administrator = req.user.id;

  Band.create(bandUser)
    .then(() => res.redirect("/bands"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("bands/registerBand", {bandUser, errors: error.errors});
      } else {
        next(error);
      }
    });
};

module.exports.listBands = (req, res, next) => {
  Band.find()
    .then((bands) => {
      console.debug(bands)
      res.render("bands/bands", { bands })
    })
    .catch((error) => next(error));
    };
  