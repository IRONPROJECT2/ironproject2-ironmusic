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
      required: true
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


 // Campo virtual 'messages' que establece una relación con el modelo 'Message'
 bandjamSchema.virtual('messages', {
  ref: 'Message', // Especifica el modelo al que está vinculado el campo virtual
  localField: '_id', // Especifica el campo local del modelo 'Issue' para la relación
  foreignField: 'postType', // Especifica el campo en el modelo 'Message' para la relación
  justOne: false // Indica si la relación es de uno a uno o uno a muchos (en este caso es de uno a muchos)
})


const Bandjam = mongoose.model("Bandjam", bandjamSchema);
module.exports = Bandjam;
