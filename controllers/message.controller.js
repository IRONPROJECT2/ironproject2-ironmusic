const mongoose = require("mongoose");
const createError = require("http-errors");
const Message = require("../models/message.model");
const Bandjam = require("../models/bandjam.model");
const FormBand = require("../models/formarbanda.model");
const Atc = require("../models/anunciatuconcierto.model");

module.exports.bandjamMessage = (req, res, next) => {
  const postId = req.params.id;
  Bandjam.findById(postId)
    .then((post) => {
      if (!post) {
        next(createError(404, "No hay post"))
      } else {
        const message = req.body;
        message.owner = req.user.id;
        message.postType = "Bandjam"
        return Message.create(message)
          .then(() => {
            req.user.posts.push(bandjam._id);
            res.redirect("/bandjam")
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.status(400).render("bandjam", { post, errors: error.errors, message: req.body })
            } else {
              next(error);
            }
          });
      }
    })
    .catch((error) => next(error))
}


//module.exports.formbandMessage = (req, res, next)