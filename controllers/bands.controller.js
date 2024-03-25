const createError = require("http-errors");
const mongoose = require('mongoose');
const Band = require("../models/band.model");
const Rating = require("../models/rating.model");

module.exports.create = (req, res, next) => res.render("bands/registerBand");

module.exports.doCreate = (req, res, next) => {
  const bandUser = req.body;
  bandUser.administrator = req.user.id;

  Band.findOne({name: req.body.name})
    .then((band) => {
      if (band) {
        res.status(409).render("bands/registerBand", {
          errors: { 
            name: "El nombre de la banda es obligatorio", 
            biography: "La biografía es obligatoria", 
            location: "La ubicación de la banda es obligatoria"
          }
        })
      } else {
        if (req.body.photo === "") {
          req.body.photo = "https://i.postimg.cc/6QH9kchf/f1b84763-a7d9-4e48-b583-9e3dc24bbcdf.jpg";
        }

        return Band.create(bandUser)
          .then((band) => {
            band.members.push(req.user.id);
            return band.save();
          })
          .then(() => res.redirect("/bands"));
      }
    }).catch((error) => {
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
        Rating.find({band: band._id})
          .populate("users")
          .then((result) => {
            if (result && result.length > 0 && result[0].rating) {
              const sum = result[0].rating.reduce((acc, num) => {
                return acc + num
              }, 0);
              const average = Math.round(sum / result[0].rating.length);
              band.rating = average;
              res.render("bands/bandDetails", { band, result: result[0], average });
            } else {
              res.render("bands/bandDetails", { band } )
            }   
          })
          .catch((error) => next(error))
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
      const referer = req.get('Referer');
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
  const ranking = req.body
  Rating.find({ band: req.body.band })
    .populate("band")
    .then((rating) => {
      if (!rating || rating.length === 0) {
        Rating.create(ranking)
          .then((algo) => {
            Band.findByIdAndUpdate(algo.band._id, {rating: algo.rating[0]}, { new: true })
              .then((band) => {
                res.redirect(`/band/${band._id}/detail`)
              })
          })
          .catch((error) => next(error));
      } else {
        rating[0].rating.push(req.body.rating);
        rating[0].users.push(req.body.users)
        rating[0].save()
          .then((updatedRating) => {
            const sum = updatedRating.rating.reduce((acc, num) => {
              return acc + num
            }, 0);
            const average = Math.round(sum / updatedRating.rating.length);
            Band.findByIdAndUpdate(updatedRating.band, {rating: average}, { new: true })
              .then((band) => res.redirect(`/band/${band.id}/detail`))
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
}
  