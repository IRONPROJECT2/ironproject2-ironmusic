const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema (
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: [true, 'Message text is required']
    },
    post: {
      type: Schema.Types.ObjectId,
      refPath: 'postType'
    },
    postType: {
      type: String,
      enum: ["Bandjam", "Formarbanda", "Anunciatuconcierto"]
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;