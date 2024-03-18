const express = require('express');

const api = express.Router();
const messageController = require('../controllers/message.js');
const check = require('../middlewares/auth');
const trimRequest = require("trim-request");

api.post('/sendMessage',trimRequest.all, check.auth, messageController.sendMessage);
api.get('/getMessages/:convo_id',trimRequest.all, check.auth, messageController.getMessages);


module.exports = api;


// import trimRequest from "trim-request";
// import authMiddleware from "../middlewares/authMiddleware.js";
// import { sendMessage, getMessages } from "../controllers/message.controller.js";
// const router = express.Router();

// router.route("/").post(trimRequest.all, authMiddleware, sendMessage);
// router.route("/:convo_id").get(trimRequest.all, authMiddleware, getMessages);
// export default router;