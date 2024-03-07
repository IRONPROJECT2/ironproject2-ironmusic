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
      minLength: [8, 'Password needs at least 8 chars']
    },
    gender: {
      type: String,
      enum: [male, female, other, none]
    },
    foto: {
      type: String,
      //PREGUNTAR COMO VER SI ES HOMBRE MUJER U OTRO
    },
    instruments: [{
      type: String,
      enum: ['Guitarra', 'Batería', 'Bajo', 'Teclado', 'Violín',
      'Saxofón', 'Trompeta', 'Flauta', 'Piano', 'Trombón',
      'Oboe', 'Clarinete', 'Arpa', 'Contrabajo', 'Cello',
      'Djembe', 'Congas', 'Xilófono', 'Tuba', 'Banjo',
      'Harmónica', 'Acordeón', 'Ukelele', 'Viola', 'Sitar',
      'Cuerno Francés', 'Cítara', 'Steel Drum', 'Theremin',
      'Kalimba', 'Didgeridoo', 'Bagpipes', 'Marimba', 'Erhu',
      'Zampoña', 'Melódica', 'Charango', 'Mandolina', 'Gaita',
      'Dulcémele', 'Shakuhachi', 'Koto', 'Pandereta', 'Gong']
    }],
    description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [10, 'Description needs at least 10 chars']
    },
    bands: [{
      type: Schema.Types.ObjectId,
      ref: "Banda"
    }],
    socialMedia: {
      type: String
    },
    bandaRequest: [{
      bandaId: {
        type: Schema.Types.ObjectId,
        ref: "Bandas"
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending" 
      }
    }]
  },
  { timestamps: true}
);

// FALTA EXPORTAR EL USUARIO
