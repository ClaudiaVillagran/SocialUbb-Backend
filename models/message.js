const { Schema, model } = require("mongoose");

const messageSchema = Schema(
  {
    sender: {
      type: Schema.ObjectId,
      ref: "Student",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: Schema.ObjectId,
      ref: "Conversation",
    },
    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

module.exports = model("Message", messageSchema);
