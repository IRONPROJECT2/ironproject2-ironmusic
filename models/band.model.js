const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    musicalGenre: {
      type: String,
      enum: ["Rock", "Pop", "Indie", "Hip Hop",
      "Jazz", "Blues", "Reggae", "R&B", "Country",
      "Electrónica", "Folk", "Metal", "Punk", "Clásica",
      "Soul", "Funk","Gospel", "Salsa", "Reggaeton", "Alternativa"]
    },
    biography : {
      type: String,
      required: [true, "La biografía es obligatoria"],
      minLength: [10, "La biografía necesita al menos 10 caracteres"]     
    },
    photo: {
      type: String
    },
    socialMedia: [{
      type: String
    }],
    administrator: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    members: [{
      type: Schema.Types.ObjectId, 
      ref: "User"
    }],
    pendingMembers: [{
      type: Schema.Types.ObjectId, 
      ref: "User"
    }],
    created: {
      type: Date
    },
    rating: {
      type: Number
    }
  },
  { timestamps: true }
)

bandSchema.virtual('bandRating', {
  ref: 'Rating', 
  localField: '_id', //Que voy a utilizar para identificarme en mi modelo
  foreignField: 'band', //Que voy a utilizar para identificarme en el modelo que aparezca en ref
  justOne: false 
});

const Band = mongoose.model('Band', bandSchema);
module.exports = Band;
