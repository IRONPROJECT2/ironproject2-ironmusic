const User = require("../models/user.model");
const Band = require("../models/band.model");
const mongoose = require('mongoose');
const { sessions } = require("../middlewares/auth.middleware");
const createError = require("http-errors");
const Bandjam = require("../models/bandjam.model");
const FormBand = require("../models/formarbanda.model")
const Atc = require("../models/anunciatuconcierto.model");
const Message = require("../models/message.model");



module.exports.reglog = (req, res, next) => {
  res.render('users/reglog');
}

module.exports.doRegister = (req, res, next) => {
  User.findOne({userName: req.body.userName, email: req.body.email})
    .then((user) => {
      if (user) {
        res.status(409).render("users/reglog", { user: req.body, errors: { userName: "Ya existe", email: "Ya existe"}});
      } else {
        if (req.body.photo === "") {
          switch (req.body.gender) {
            case "male":
              req.body.photo = "https://i.postimg.cc/tJHXcyzH/f9fc35e1-7645-4b41-947e-2365091606f5.jpg";
              break;
            case "female":
              req.body.photo = "https://i.postimg.cc/qBX07PLz/2920322b-c914-47f3-93ee-d1882f49fb08.jpg";
              break;
            case "other":
              req.body.photo = "https://i.postimg.cc/VLVhsg3J/b49653e2-5aaf-4fbb-b970-86a0ab58a4eb.jpg";
              break;
          }
        }

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


module.exports.search = (req, res, next) => {
  const searched = req.body.query;
  const search = [
    User.find({ $or: [{ name: new RegExp(searched, 'i') }, { userName: new RegExp(searched, 'i') }] }),
    Band.find({ name: new RegExp(searched, 'i')}, { administrator: new RegExp(searched, 'i')}),
    Bandjam.find({ bandName: new RegExp(searched, 'i')}, { creator: new RegExp(searched, 'i')}),
    FormBand.find({ name: new RegExp(searched, 'i')}, { creator: new RegExp(searched, 'i')}),
    Atc.find({ name: new RegExp(searched, 'i')}, { creator: new RegExp(searched, 'i')})
  ];

  Promise.all(search)
    .then((results) => {
      const [users, bands, bandjam, formarBanda, atc] = results;
      const bandIds = bands.map(band => band._id);
      const bandjamIds = bandjam.map(band => band._id);
      const formarBandaIds = formarBanda.map(band => band._id);
      const atcIds = atc.map(band => band._id);

      // Búsqueda por lotes de los documentos correspondientes a los IDs
      const bandPromises = Band.find({ _id: { $in: bandIds }});
      const bandjamPromises = Bandjam.find({ _id: { $in: bandjamIds }});
      const formarBandaPromises = FormBand.find({ _id: { $in: formarBandaIds }});
      const atcPromises = Atc.find({ _id: { $in: atcIds }});

      return Promise.all([bandPromises, bandjamPromises, formarBandaPromises, atcPromises])
        .then(([foundBands, foundBandjams, foundFormarBanda, foundAtc]) => {
          res.render("misc/search", { users, bands: foundBands, bandjam: foundBandjams, formarBanda: foundFormarBanda, atc: foundAtc});
        });
    })
    .catch((error) => next(error));
};


