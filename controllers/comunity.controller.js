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
    console.debug(postBand)
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

module.exports.bandjamEdit = (req, res, next) => {
  const genre = ["Rock", "Pop", "Indie", "Hip Hop",
  "Jazz", "Blues", "Reggae", "R&B", "Country",
  "Electrónica", "Folk", "Metal", "Punk", "Clásica",
  "Soul", "Funk","Gospel", "Salsa", "Reggaeton", "Alternativa"]

  const inst = ["Voz", "Coros", "Guitarra", "Bajo", "Teclado", "Batería", "Piano",
  "Saxofón", "Arpa", "Acordeón", "Banjo", "Bagpipes", "Cello", "Charango",
  "Clarinete", "Contrabajo", "Congas" ,"Cítara", "Cuerno Francés", "Djembe",
  "Didgeridoo", "Dulcémele", "Erhu", "Flauta", "Gaita", "Gong", "Harmónica",
  "Kalimba", "Koto", "Mandolina", "Marimba", "Melódica", "Oboe", "Pandereta",
  "Sitar", "Shakuhachi", "Steel Drum", "Trombón" ,"Trompeta", "Theremin", "Tuba", 
  "Ukelele", "Viola", "Violín", "Xilófono", "Zampoña"]
  Bandjam.findById(req.params.id)
  .then((bandjam) => {
    if (!bandjam) {
      next(createError(404, "Banda no encontrada"));
    } else {
      res.render("comunity/edits/bandjamEdit", { bandjam, genre, inst })
    }
  })
  .catch((error) => next(error))
}

module.exports.bandjamDoEdit = (req, res, next) => {
  const { id } = req.params;

  Bandjam.findByIdAndUpdate(id, req.body, { new: true })
    .then((bandjam) => {
      if (!bandjam) {
        next(createError(404, "Banda no encontrada"));
      } else {
        res.redirect("/bandjam");
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("comunity/edits/bandjamDoEdit", { bandjam: req.body, errors: error.errors});
      } else {
        next(error);
      }
    });
};

module.exports.bandjamDelete = (req, res, next) => {

  Bandjam.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/bandjam"))
    .catch((error) => next(error))
}

module.exports.bandjamDetails = (req, res, next) => {

  Bandjam.findById(req.params.id)
    .then((postBand) => res.render("comunity/details/bandjamDetails", { postBand }))
    .catch((error) => next(error))
}

module.exports.formarBandaEdit = (req, res, next) => {
  const genre = ["Rock", "Pop", "Indie", "Hip Hop",
  "Jazz", "Blues", "Reggae", "R&B", "Country",
  "Electrónica", "Folk", "Metal", "Punk", "Clásica",
  "Soul", "Funk","Gospel", "Salsa", "Reggaeton", "Alternativa"]

  const inst = ["Voz", "Coros", "Guitarra", "Bajo", "Teclado", "Batería", "Piano",
  "Saxofón", "Arpa", "Acordeón", "Banjo", "Bagpipes", "Cello", "Charango",
  "Clarinete", "Contrabajo", "Congas" ,"Cítara", "Cuerno Francés", "Djembe",
  "Didgeridoo", "Dulcémele", "Erhu", "Flauta", "Gaita", "Gong", "Harmónica",
  "Kalimba", "Koto", "Mandolina", "Marimba", "Melódica", "Oboe", "Pandereta",
  "Sitar", "Shakuhachi", "Steel Drum", "Trombón" ,"Trompeta", "Theremin", "Tuba", 
  "Ukelele", "Viola", "Violín", "Xilófono", "Zampoña"]

  FormBand.findById(req.params.id)
  .then((formarbanda) => {
    if (!formarbanda) {
      next(createError(404, "Banda no encontrada"));
    } else {
      res.render("comunity/edits/formarBandaEdit", { formarbanda, genre, inst })
    }
  })
}

module.exports.formarBandaDoEdit = (req, res, next) => {
  const { id } = req.params;

  FormBand.findByIdAndUpdate(id, req.body, { new: true })
    .then((formarbanda) => {
      if (!formarbanda) {
        next(createError(404, "Banda no encontrada"));
      } else {
        res.redirect("/formarbanda");
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("comunity/edits/formarBandaForm", { formarbanda: req.body, errors: error.errors});
      } else {
        next(error);
      }
    });
};

module.exports.formarBandaDelete = (req, res, next) => {

  FormBand.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/formarbanda"))
    .catch((error) => next(error))
}

module.exports.formarBandaDetails = (req, res, next) => {

  FormBand.findById(req.params.id)
    .then((postBand) => res.render("comunity/details/formarBandaDetails", { postBand }))
    .catch((error) => next(error))
}


module.exports.anunciatuconciertoEdit = (req, res, next) => {
  Atc.findById(req.params.id) 
    .then((post) => res.render("comunity/edits/atcEdit", { post }))
    .catch((error) => next(error)) 
}

module.exports.anunciatuconciertoDoEdit = (req, res, next) => {
  const { id } = req.params
  Atc.findByIdAndUpdate(id, req.body, { new: true })
    .then((atcEdit) => {
      if (!atcEdit) {
        next(createError(404, "No se ha conseguido editar"))
      } else {
        res.redirect("/anunciatuconcierto")
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("comunity/edits/anunciaTuConciertoForm", { atcEdit, errors: error.errors })
      }
    })
}

module.exports.anunciatuconciertoDelete = (req, res, next) => {
  Atc.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/anunciatuconcierto"))
    .catch((error) => next(error))
}

module.exports.anunciatuconciertoDetails = (req, res, next) => {

  Atc.findById(req.params.id)
    .then((postBand) => res.render("comunity/details/atcDetails", { postBand }))
    .catch((error) => next(error))
}


