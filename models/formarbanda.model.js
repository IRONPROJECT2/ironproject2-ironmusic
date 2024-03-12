const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formarbandaSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Es necesario rellenar este campo"],
      unique: true
    },
    musicalGenre: {
      type: String,
      enum: ["Rock", "Pop", "Indie", "Hip Hop",
      "Jazz", "Blues", "Reggae", "R&B", "Country",
      "Electrónica", "Folk", "Metal", "Punk", "Clásica",
      "Soul", "Funk","Gospel", "Salsa", "Reggaeton", "Alternativa"],
      required: [true, "Es necesario rellenar este campo"]
    },
    instruments: {
      type: String,
      enum: ["Voz", "Coros", "Guitarra", "Batería", "Bajo", "Teclado", "Violín",
      "Saxofón", "Trompeta", "Flauta", "Piano", "Trombón",
      'Oboe', 'Clarinete', "Arpa", 'Contrabajo', "Cello",
      "Djembe", "Congas", "Xilófono", "Tuba", "Banjo",
      'Harmónica', "Acordeón", "Ukelele", "Viola", "Sitar",
      "Cuerno Francés", "Cítara", "Steel Drum", "Theremin",
      "Kalimba", "Didgeridoo", "Bagpipes", "Marimba", "Erhu",
      "Zampoña", "Melódica", "Charango", "Mandolina", "Gaita",
      "Dulcémele", "Shakuhachi", "Koto", "Pandereta", "Gong"],
      required: [true, "Es necesario rellenar este campo"]
    },
    location: {
      type: String,
      required: [true, "Es necesario rellenar este campo"]
    },
    lookingfor: {
      type: String,
      required: [true, "Es necesario rellenar este campo"],
      minLength: [10, "La descripción necesita al menos 10 caracteres"]
    },
    creator: {
      type: String,
      required: [true, "Es necesario rellenar este campo"]
    }
  },
  { timestamps: true }
)

const Formarbanda = mongoose.model("Formarbanda", formarbandaSchema);
module.exports = Formarbanda;
