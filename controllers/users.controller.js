const User = require('../models/user.model');
const mongoose = require('mongoose');
const { sessions } = require("../middlewares/auth.middleware");
const createError = require("http-errors");



module.exports.reglog = (req, res, next) => {
  res.render('users/reglog');
}

module.exports.doRegister = (req, res, next) => {
  User.findOne({userName: req.body.userName, email: req.body.email})
    .then((user) => {
      if (user) {
        res.status(409).render("users/reglog", { user: req.body, errors: { userName: "Ya existe", email: "Ya existe"}});
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

module.exports.doLogin = (req, res, next) => {
  User.findOne({userName: req.body.userName})
    .then((user) => {
      if (!user) {
        res.status(401).render("users/reglog", { user: req.body, errors: { password: "Nombre de usuario o contraseña inválidos", userName: "Nombre de usuario o contraseña inválidos"} })
      } else {
        return user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              req.session.userId = user.id;
              res.redirect("/");    
            } else {
              res.status(401).render("users/reglog", { user: req.body, errors: { password: "Nombre de usuario o contraseña inválidos", userName: "Nombre de usuario o contraseña inválidos"} })
            }
          })
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.clearCookie("connect.sid");
  res.redirect("/");
}

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
}

module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(createError(404, "Usuario no encontrado"));
      } else {
        res.render("users/edit", { user });
      }
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  const user = req.body;
  user.id = req.params.id;

  User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true})
    .then((user) => {
      if (!user) {
        next(createError(404, "Usuario no encontrado"));
      } else {
        res.redirect("/profile");
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("users/edit", { user: req.body, errors: error.errors});
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        next(createError(404, "Usuario no encontrado"));
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => next(error));
}