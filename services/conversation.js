const Student = require("../models/student");
const Conversation = require("../models/conversation");

const doesConversationExist = async (sender_id, receiver_id, isGroup) => {
  if (isGroup === false) {
    let convos = await Conversation.find({
      isGroup: false,
      $and: [
        { students: { $elemMatch: { $eq: sender_id } } },
        { students: { $elemMatch: { $eq: receiver_id } } },
      ],
    })
      .populate("students", "-password")
      .populate("latestMessage");
    if (!convos) {
      res.status(500).json({ message: "Ha ocurrido un error" });
    }
    //populate message
    convos = await Student.populate(convos, {
      path: "latestMessage.sender",
      select: "name email image bio",
    });

    return convos[0];
  } else {
    //it's a group chat
    let convo = await Conversation.findById(isGroup)
      .populate("students admin", "-password")
      .populate("latestMessage");

    if (!convo)
    res.status(500).json({ message: "Ha ocurrido un error" });
    //populate message model
    convo = await Student.populate(convo, {
      path: "latestMessage.sender",
      select: "name email image bio",
    });
    return convo;
  }
};

const createConversation = async (convoData) => {
  const newConvo = await Conversation.create(convoData);
  if (!newConvo) {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
  return newConvo;
};

const populateConversation = async (id, fieldToPopulate, fieldsToRemove) => {
  const populatedConvo = await Conversation.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo) {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
  return populatedConvo;
};

const getUserConversations = async (sender_id) => {
  let conversations;
  await Conversation.find({ students: { $elemMatch: { $eq: sender_id } } })
    .populate("students", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await Student.populate(results, {
        path: "latestMessage.sender",
        select: "name email image bio",
      });
      conversations = results;
    })
    .catch((error) => {
      res.status(500).json({ message: "Ha ocurrido un error" });
    });

  return conversations;
};

const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await Conversation.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo) res.status(500).json({ message: "Ha ocurrido un error" });
  return updatedConvo;
};

module.exports = {
  updateLatestMessage,
  getUserConversations,
  createConversation,
  populateConversation,
  doesConversationExist,
};
