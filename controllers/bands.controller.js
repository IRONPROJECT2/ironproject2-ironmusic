const Band = require("../models/band.model");
const mongoose = require('mongoose');
const createError = require("http-errors");


module.exports.create = (req, res, next) => res.render("bands/registerBand");

module.exports.doCreate = (req, res, next) => {
  const bandUser = req.body;
  bandUser.administrator = req.user.id;

  Band.create(bandUser)
    .then((band) => {
      band.members.push(req.user.id);
      return band.save();
    })
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
  const genre = ["Rock", "Pop", "Indie", "Hip Hop",
      "Jazz", "Blues", "Reggae", "R&B", "Country",
      "Electrónica", "Folk", "Metal", "Punk", "Clásica",
      "Soul", "Funk","Gospel", "Salsa", "Reggaeton", "Alternativa"];
  Band.find()
    .then((bands) => {
      res.render("bands/bands", { bands, genre });
    })
    .catch((error) => next(error));
};

module.exports.details = (req, res, next) => {
  Band.findById(req.params.id)
    .populate("members")
    .then((band) => {
      if (!band) {
        next(createError(404, "Banda no encontrada"));
      } else {
        res.render("bands/bandDetails", { band });
      }
    })
    .catch((error) => next(error));
}

module.exports.joinBand = (req, res, next) => {
  Band.findByIdAndUpdate(req.params.id)
    .then((band) => {
      band.pendingMembers.push(req.user.id);
      return band.save();
    })
    .then(() => {
      // Obtener la URL anterior desde el encabezado Referer
      const referer = req.get('Referer');
      // Redirigir de nuevo a la misma página
      res.redirect(referer || '/');
    })
    .catch((error) => next(error));
}

module.exports.bandEdit = (req, res, next) => {
  Band.findById(req.params.id)
    .then((band) => {
      res.render("bands/bandEdit", { band });
  })
  .catch((error) => next(error))
}

module.exports.bandDoEdit = (req, res, next) => {
  Band.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.redirect("/bands");
    })
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
  Band.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/bands"))
    .catch((error) => next(error))
}

module.exports.rating = (req, res, next) => {
  console.debug(req.body);
}
  