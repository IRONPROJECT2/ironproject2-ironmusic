const mongoose = require('mongoose');
const createError = require("http-errors");
const Bandjam = require("../models/bandjam.model");
const FormBand = require("../models/formarbanda.model")
const Atc = require("../models/anunciatuconcierto.model");
const User = require("../models/user.model");
const Band = require("../models/band.model");



module.exports.list = (req, res, next) => res.render("comunity/comunity");

module.exports.bandjam = (req, res, next) => {
  Bandjam.find()
  .then((postBand) => { 
    res.render("comunity/bandjam", { postBand })
  })
  .catch((error) => next(error));
};

module.exports.formarbanda = (req, res, next) => {
  FormBand.find()
  .then((postBand) => {
    res.render("comunity/formarbanda", { postBand })  
  })
  .catch((error) => next(error));
};

module.exports.anunciatuconcierto = (req, res, next) => {
  Atc.find()
    .then((postBand) => res.render("comunity/anunciatuconcierto", { postBand }))
    .catch((error) => next(error));
  
};

/* FORMS */

module.exports.bandjamForm = (req, res, next) => {
  res.render("comunity/forms/bandjamForm");
};

module.exports.doBandjamForm = (req, res, next) => {
  const userCreator = req.body;
  userCreator.creator = req.user.id;
  userCreator.postType = "Bandjam";

  Bandjam.create(userCreator)
    .then((bandjam) => {
      req.user.posts.push(bandjam._id);
      return req.user.save();
    })
    .then(() => res.redirect("/bandjam"))
    .catch((error) => next(error));
}

module.exports.formarBandaForm = (req, res, next) => {
  res.render("comunity/forms/formarBandaForm")
};

module.exports.doFormarBandaForm = (req, res, next) => {
  const userCreator = req.body;
  userCreator.creator = req.user.id;
  userCreator.instruments = req.body.instruments;
  userCreator.postType = "Formarbanda";
  
  FormBand.create(userCreator)
  .then((formarbanda) => {
    req.user.posts.push(formarbanda._id);
    return req.user.save();
  })
  .then(() => res.redirect("/formarbanda"))
  .catch((error) => next(error));
}


module.exports.anunciaTuConciertoForm = (req, res, next) => {
  res.render("comunity/forms/anunciaTuConciertoForm")
};

module.exports.doAnunciaTuConciertoForm = (req, res, next) => {
  const userCreator = req.body;
  userCreator.creator = req.user.id;
  userCreator.postType = "Anunciatuconcierto";

  Atc.create(userCreator)
    .then((bandPost) => {
      req.user.posts.push(bandPost._id);
      return req.user.save();
    })
    .then(() => res.redirect("/anunciatuconcierto"))
    .catch((error) => next(error));
    
}

