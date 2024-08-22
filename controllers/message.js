const { updateLatestMessage } = require("../services/conversation.js");
const {
  createMessage,
  getConvoMessages,
  populateMessage,
} = require("../services/message.js");

const sendMessage = async (req, res) => {
  try {
    const user_id = req.user.studentId;
    const { message, convo_id, files } = req.body;
    // console.log(files)
    if (!convo_id || (!message && !files)) {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error al agregar el mensaje." });
    }
    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || []
    };

    let newMessage = await createMessage(msgData);
    let populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(convo_id, newMessage);
    res.json(populatedMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al agregar el mensaje." });
  }
};

const getMessages = async (req, res) => {
  try {
    const convo_id = req.params.convo_id;
    if (!convo_id) {
      res
        .status(500)
        .json({ message: "No ha ingresado el id de la conversacion." });
    }
    const messages = await getConvoMessages(convo_id);
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener los mensajes." });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
