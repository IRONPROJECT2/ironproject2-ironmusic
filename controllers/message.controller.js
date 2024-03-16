const mongoose = require("mongoose");
const createError = require("http-errors");
const Message = require("../models/message.model");
const Bandjam = require("../models/bandjam.model");
const FormBand = require("../models/formarbanda.model");
const Atc = require("../models/anunciatuconcierto.model");

module.exports.doCreate = (req, res, next) => {
  const message = req.body;
  message.owner = req.user.id;
  return Message.create(message)
    .then(() => {
      res.redirect("/bandjam") //redirigir a (postBand) depende de la ruta (hay que hacer un switch)
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("bandjam", { post, errors: error.errors, message: req.body })
      } else {
        next(error);
      }
    });
}

