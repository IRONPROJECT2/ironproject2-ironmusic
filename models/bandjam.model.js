const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandjamSchema = new Schema(
  {
    bandName: {
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
    numberOfMembers: {
      type: Number,
      required: [true, "Es obligatorio indicar el número de miembros de tu banda"]
    },
    location: {
      type: String,
      required: [true, "La ubicación de la banda es obligatoria"]
    },
    lookingfor: {
      type: String,
      required: [true, "La descripción es obligatoria"],
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


 bandjamSchema.virtual('messages', {
  ref: 'Message', 
  localField: '_id', //Que voy a utilizar para identificarme en mi modelo
  foreignField: 'postType', //Que voy a utilizar para identificarme en el modelo que aparezca en ref
  justOne: false 
})

const Bandjam = mongoose.model("Bandjam", bandjamSchema);
module.exports = Bandjam;
