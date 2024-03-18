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
    .then((message) => {
      console.debug(message.postType)
      switch (message.postType) {
        case "Bandjam": 
          res.redirect(`/bandjam/${message.post}/details`);
          break;
        case "Formarbanda": 
          console.debug("estoy en el mensaje")
          res.redirect(`/formarBanda/${message.post}/details`);
          break;
        case "Anunciatuconcierto": 
          res.redirect(`/anunciatuconcierto/${message.post}/details`);
          break;
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("bandjam", { post, errors: error.errors, message: req.body })
      } else {
        next(error);
      }
    });
}
