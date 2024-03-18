const { Schema, model } = require("mongoose");

const conversationSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la conversación es requerida"],
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    students: [
      {
        type: Schema.ObjectId,
        ref: "Student",
      },
    ],
    latestMessage: {
      type: Schema.ObjectId,
      ref: "Message",
    },
    admin: {
      type: Schema.ObjectId,
      ref: "Student",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

module.exports = model("Conversation", conversationSchema);
