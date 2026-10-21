const Band = require("../models/band.model");
const Atc = require("../models/anunciatuconcierto.model")

module.exports.index = (req, res, next) => {
  Promise.all([
    Band.find().sort({ created: -1 }).limit(5).exec(),
    Band.find().sort({ rating: -1 }).limit(10).populate("members").lean().exec(),
    Atc.find().sort({ date: 1 }).limit(6).exec()
  ])
  .then(([bands, rating, concerts]) => {
    rating.forEach((band, index) => {
      band.position = index + 1;
    });
    res.render("index", { bands, rating, concerts });
  })
  .catch((error) => {
    next(error);
  });
}