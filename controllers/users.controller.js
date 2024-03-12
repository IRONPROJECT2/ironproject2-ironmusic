const User = require("../models/user.model");
const Band = require("../models/band.model");
const mongoose = require('mongoose');
const { sessions } = require("../middlewares/auth.middleware");
const createError = require("http-errors");
const Swal = require("sweetalert2");



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
  Band.find()
    .populate('pendingMembers')
    .populate('members')
    .then((bands) => {
      if (!bands) {
        next(createError(404, "Banda no encontrada"));
      } else {
        const pendingMembersIds = bands.reduce((acc, band) => {
          return acc.concat(band.pendingMembers);
        }, []);

        User.find({ _id: pendingMembersIds })
          .then((pendingMembers) => {
            res.render("users/profile", { pendingMembers, bands });
          })
          .catch((error) => next(error))
      }
    })
    .catch((error) => next(error));
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

// module.exports.delete = (req, res, next) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!"
//   })
//   .then((result) => {
//     if (result.isConfirmed) {
//       User.findByIdAndDelete(req.params.id)
//         .then((user) => {
//           if (!user) {
//             next(createError(404, "Usuario no encontrado"));
//           } else {
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted.",
//               icon: "success"
//             });
//             res.redirect("/");
//           }
//         })
//         .catch((error) => next(error));
//     }
//   });
// }


module.exports.acceptNewMember = (req, res, next) => {
  const userId = req.params.id;
  const bandId = req.query.bandId;

  const updateUser = User.findByIdAndUpdate(userId, { $push: { bands: bandId } });
  const updateBand = Band.findByIdAndUpdate(bandId, { $push: { members: userId }, $pull: { pendingMembers: userId } });

  Promise.all([updateUser, updateBand])
    .then(() => {
      res.redirect("/profile");
    })
    .catch((error) => next(error));
}

module.exports.removeNewMember = (req, res, next) => {
  const userId = req.params.id;
  const bandId = req.query.bandId;
  
  Band.findByIdAndUpdate(bandId, { $pull: { pendingMembers: userId} })
    .then(() => res.redirect("/profile"))
    .catch((error) => next(error));
} 

module.exports.removeMember = (req, res, next) => {
  const userId = req.params.id;
  const bandId = req.query.bandId;

  Band.findByIdAndUpdate(bandId, { $pull: { members: userId } })
    .then(() => res.redirect("/profile"))
    .catch((error) => next(error));
}