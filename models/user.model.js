const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "La contraseña necesita al menos 8 caracteres"]
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "none"]
    },
    photo: {
      type: String,
      //PREGUNTAR COMO VER SI ES HOMBRE MUJER U OTRO
    },
    instruments: [{
      type: String,
      enum: ["Voz", "Coros", "Guitarra", "Batería", "Bajo", "Teclado", "Violín",
      "Saxofón", "Trompeta", "Flauta", "Piano", "Trombón",
      'Oboe', 'Clarinete', "Arpa", 'Contrabajo', "Cello",
      "Djembe", "Congas", "Xilófono", "Tuba", "Banjo",
      'Harmónica', "Acordeón", "Ukelele", "Viola", "Sitar",
      "Cuerno Francés", "Cítara", "Steel Drum", "Theremin",
      "Kalimba", "Didgeridoo", "Bagpipes", "Marimba", "Erhu",
      "Zampoña", "Melódica", "Charango", "Mandolina", "Gaita",
      "Dulcémele", "Shakuhachi", "Koto", "Pandereta", "Gong"]
    }],
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      minLength: [10, "La descripción necesita al menos 10 caracteres"]
    },
    location: {
      type: String,
      required: true
    },
    bands: [{
      type: Schema.Types.ObjectId,
      ref: "Band"
    }],
    socialMedia: [{
      type: String
    }],
    posts: [{
      type: Schema.Types.ObjectId,
      refPath: 'postType'
    }],
    postType: {
      type: String,
      required: true,
      enum: ["Bandjam", "Formarbanda", "Anunciatuconcierto"]
    }
  },
  { timestamps: true}
);

// Hashing the password
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

// Checking the password
userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};



const User = mongoose.model('User', userSchema);
module.exports = User;
