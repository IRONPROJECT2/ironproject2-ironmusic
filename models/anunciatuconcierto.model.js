const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const anunciatuconciertoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Es necesario rellenar este campo"],
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
    // time: {
    //   type: String,
    //   required: [true, "Es necesario rellenar este campo"]
    // },
    creator: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
)

const Anunciatuconcierto = mongoose.model("Anunciatuconcierto", anunciatuconciertoSchema);
module.exports = Anunciatuconcierto;
