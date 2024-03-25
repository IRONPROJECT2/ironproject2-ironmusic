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
    switch (message.postType) {
        case "Bandjam": 
          res.redirect(`/bandjam/${message.post}/details`);
          break;
        case "Formarbanda": 
          res.redirect(`/formarBanda/${message.post}/details`);
          break;
        case "Anunciatuconcierto": 
          res.redirect(`/anunciatuconcierto/${message.post}/details`);
          break;
        default:
          res.redirect("/");
          break;
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        req.session.flash = 'ERROR AL CREAR EL COMENTARIO, DEBE ESTAR EL CAMPO RELLENO'

        switch (message.postType) {
          case "Bandjam": 
            res.redirect(`/bandjam/${message.post}/details`);
            break;
          case "Formarbanda": 
            res.redirect(`/formarBanda/${message.post}/details`);
            break;
          case "Anunciatuconcierto": 
            res.redirect(`/anunciatuconcierto/${message.post}/details`);
            break;
          default:
            res.redirect("/");
            break;
        }
        
      } else {
        next(error);
      }
    });
}


module.exports.messageEdit = (req, res, next) => {
  Message.findById(req.params.id)
    .populate("post")
    .then((message) => {
      switch (message.postType) {
        case "Bandjam": 
          res.render(`comunity/details/editComent/bandjamEditComent`, { message });
          break;
        case "Formarbanda": 
          res.render(`comunity/details/editComent/formarBandaEditComent`, { message });
          break;
        case "Anunciatuconcierto": 
          res.render(`comunity/details/editComent/atcEditComent`, { message });
          break;
        default:
          res.redirect("/");
          break;
      }
    })
    .catch((error) => next(error));
}

module.exports.messageDoEdit = (req, res, next) => {
  Message.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
    .then((message) => {
      if (!message) {
        return res.status(404).send('Mensaje no encontrado');
      }
      switch (message.postType) {
        case "Bandjam": 
          res.redirect(`/bandjam/${message.post}/details`);
          break;
        case "Formarbanda": 
          res.redirect(`/formarBanda/${message.post}/details`);
          break;
        case "Anunciatuconcierto": 
          res.redirect(`/anunciatuconcierto/${message.post}/details`);
          break;
        default:
          res.redirect("/");
          break;
      }
    })
    .catch((error) => next(error));
}


module.exports.messageDelete = (req, res, next) => {
  Message.findByIdAndDelete(req.params.id)
    .then((message) => {
      switch (message.postType) {
        case "Bandjam": 
          res.redirect(`/bandjam/${message.post}/details`);
          break;
        case "Formarbanda": 
          res.redirect(`/formarBanda/${message.post}/details`);
          break;
        case "Anunciatuconcierto": 
          res.redirect(`/anunciatuconcierto/${message.post}/details`);
          break;
        default:
          res.redirect("/");
          break;
      }
    })
    .catch((error) => next(error));
}