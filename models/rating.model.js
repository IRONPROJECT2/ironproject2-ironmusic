const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    members: [{
      type: Schema.Types.ObjectId, 
      ref: "User"
    }],
    band: {
      type: Schema.Types.ObjectId, 
      ref: "Band"
    },
    rating: [{
      type: Number
    }]
  },
  { timestamps: true }
)

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
