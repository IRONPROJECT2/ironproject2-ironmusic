const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    bandName: {
      type: String,
      required: true
    },
    rating: {
      type: String
    }
  }
)


//id banda id usuario id rating