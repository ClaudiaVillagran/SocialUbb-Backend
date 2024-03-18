const Message = require("../models/message.js");

const createMessage = async (data) => {
  let newMessage = await Message.create(data);
  if (!newMessage) res.status(500).json({ message: "Ha ocurrido un error" });
  return newMessage;
};

const populateMessage = async (id) => {
  let msg = await Message.findById(id)
    .populate({
      path: "sender",
      select: "name image",
      model: "Student",
    })
    .populate({
      path: "conversation",
      select: "name image isGroup students",
      model: "Conversation",
      populate: {
        path: "students",
        select: "name email image bio",
        model: "Student", 
      },
    });
  if (!msg) res.status(500).json({ message: "Ha ocurrido un error" });
  return msg;
};

const getConvoMessages = async (convo_id) => {

  const messages = await Message.find({ conversation: convo_id })
    .populate("sender", "name image email bio")
    .populate("conversation");
  if (!messages) {
    
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return messages;
};


module.exports = {
  createMessage,
  populateMessage,
  getConvoMessages,
}