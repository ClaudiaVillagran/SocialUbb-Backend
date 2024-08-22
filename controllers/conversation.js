// const Student = require('../models/student');
// const Publication = require('../models/publication');
const Conversation = require("../models/conversation");
const {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} = require("../services/conversation.js");
const { findUser } = require("../services/student");

const create_open_conversation = async (req, res) => {
  try {
    const sender_id = req.user.studentId;
    const { receiver_id, isGroup=false } = req.body;
    // console.log(req.body);
    // console.log(req.body);
    if (isGroup == false) {
      //check if receiver is provided
      if (!receiver_id) {
        res.status(500).json({ message: "Debe ingresar todos los datos" });
      }

      //check if chat exists
      console.log('a');
      const existed_conversation = await doesConversationExist(
        sender_id,
        receiver_id,
        false
      );
        // console.log(existed_conversation);
      if (existed_conversation) {
        res.json(existed_conversation);
      } else {
        // let receiver_user = await findUser(receiver_id);
        let convoData = {
          name: "conversation name",
          image: "conversation image",
          isGroup: false,
          students: [sender_id, receiver_id],
        };
        // console.log(convoData);
        const newConvo = await createConversation(convoData);

        const populatedConvo = await populateConversation(
          newConvo._id,
          "students",
          "-password"
        );
        res.json(populatedConvo);
      }
    } else {
      // console.log("hnaaaaaaaaaa");
      //it's a group chat
      //check if group chat exists
      const existed_group_conversation = await doesConversationExist(
        "",
        "",
        isGroup
      );
      res.status(200).json(existed_group_conversation);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al agregar la conversacion." });
  }
};

const getConversations = async (req, res) => {
  try {
    const sender_id = req.user.studentId;
    const conversations = await getUserConversations(sender_id);
    res.json(conversations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener las conversaciones." });
  }
};

const createGroup = async (req, res) => {
  const { name, students } = req.body;
  // console.log(req.body);
  //add current user to users
  students.push(req.user.studentId);
  if (!name || !students) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al crear el grupo." });
  }
  if (students.length < 2) {
    res.status(500).json({ message: "Debes agregar al menos dos usuarios" });
  }
  let convoData = {
    name,
    students,
    isGroup: true,
    admin: req.user.studentId,
    image: process.env.DEFAULT_IMAGE,
  };
  try {
    const newConvo = await createConversation(convoData);
    const populatedConvo = await populateConversation(
      newConvo._id,
      "students admin",
      "-password"
    );
    res.status(200).json(populatedConvo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al crear el grupo." });
  }
};

module.exports = {
  create_open_conversation,
  getConversations,
  createGroup,
};
