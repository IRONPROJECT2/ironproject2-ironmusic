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
      required: true
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
      enum: ["male", "female", "other"]
    },
    photo: {
      type: String,
      //PREGUNTAR COMO VER SI ES HOMBRE MUJER U OTRO
    },
    instruments: [{
      type: String,
      enum: ["Voz", "Coros", "Guitarra", "Bajo", "Teclado", "Batería", "Piano",
      "Saxofón", "Arpa", "Acordeón", "Banjo", "Bagpipes", "Cello", "Charango",
      "Clarinete", "Contrabajo", "Congas" ,"Cítara", "Cuerno Francés", "Djembe",
      "Didgeridoo", "Dulcémele", "Erhu", "Flauta", "Gaita", "Gong", "Harmónica",
      "Kalimba", "Koto", "Mandolina", "Marimba", "Melódica", "Oboe", "Pandereta",
      "Sitar", "Shakuhachi", "Steel Drum", "Trombón" ,"Trompeta", "Theremin", "Tuba", 
      "Ukelele", "Viola", "Violín", "Xilófono", "Zampoña"]
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
