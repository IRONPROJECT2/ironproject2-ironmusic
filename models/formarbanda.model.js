const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formarbandaSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Es necesario rellenar este campo"],
    },
    musicalGenre: {
      type: String,
      enum: ["Rock", "Pop", "Indie", "Hip Hop",
      "Jazz", "Blues", "Reggae", "R&B", "Country",
      "Electrónica", "Folk", "Metal", "Punk", "Clásica",
      "Soul", "Funk","Gospel", "Salsa", "Reggaeton", "Alternativa"],
      required: [true, "Es necesario rellenar este campo"]
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
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
)

const Formarbanda = mongoose.model("Formarbanda", formarbandaSchema);
module.exports = Formarbanda;
