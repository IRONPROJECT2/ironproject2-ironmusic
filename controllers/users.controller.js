const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.reglog = (req, res, next) => {
  res.render('users/reglog');
}

module.exports.doRegister = (req, res, next) => {
  console.debug(req.body)
  User.findOne({userName: req.body.userName, email: req.body.email})
    .then((user) => {
      if (user) {
        res.status(409).render("users/reglog", { user: req.body, errors: { userName: "Already exists", email: "Already exists"}});
      } else {
        const userOk = {
          userName: req.body.userName, 
          name: req.body.name, 
          email: req.body.email, 
          password: req.body.password,
          gender: req.body.gender,
          photo: req.body.photo,
          instruments: req.body.instruments,
          description: req.body.description,
          location: req.body.location,
          //bands: req.body.bands,
          socialMedia: req.body.socialMedia
        };
        return User.create(userOk)
          .then(() => res.redirect("/reglog"))
      }
    }).catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("users/reglog", { user: req.body, errors: error.errors});
      } else {
        next(error);
      }
    });
};
