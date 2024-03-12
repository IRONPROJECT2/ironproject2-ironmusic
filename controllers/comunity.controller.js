const mongoose = require('mongoose');
const createError = require("http-errors");
const Bandjam = require("../models/bandjam.model");
const FormBand = require("../models/formarbanda.model")
const Atc = require("../models/anunciatuconcierto.model");



module.exports.list = (req, res, next) => res.render("comunity/comunity");
module.exports.bandjam = (req, res, next) => {
  res.render("comunity/bandjam")
};
module.exports.formarbanda = (req, res, next) => res.render("comunity/formarbanda");
module.exports.anunciatuconcierto = (req, res, next) => res.render("comunity/anunciatuconcierto");

module.exports.bandjamForm = (req, res, next) => res.render("comunity/forms/bandjamForm");
module.exports.formarBandaForm = (req, res, next) => res.render("comunity/forms/formarBandaForm");
module.exports.anunciaTuConciertoForm = (req, res, next) => res.render("comunity/forms/anunciaTuConciertoForm");


