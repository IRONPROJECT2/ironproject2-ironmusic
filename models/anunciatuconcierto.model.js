const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const anunciatuconciertoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Es necesario rellenar este campo"],
      unique: true
    },
    descriptionGenre: {
      type: String,
      required: [true, "Es necesario rellenar este campo"]
    },
    photo: {
        type: String,
        required: [true, "Es necesario rellenar este campo"]
    },
    location: {
      type: String,
      required: [true, "Es necesario rellenar este campo"]
    },
    date: {
      type: Date,
      required: [true, "Es necesario rellenar este campo"]
    },
    time: {
      type: Date,
      required: [true, "Es necesario rellenar este campo"]
    },
    creator: {
      type: String,
      required: [true, "Es necesario rellenar este campo"]
    }
  },
  { timestamps: true }
)

const Anunciatuconcierto = mongoose.model("Anunciatuconcierto", anunciatuconciertoSchema);
module.exports = Anunciatuconcierto;
