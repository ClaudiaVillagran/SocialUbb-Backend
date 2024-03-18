const express = require('express');
// const trimRequest = require('trim-request');
const api = express.Router();
const conversationController = require('../controllers/conversation.js');
const check = require('../middlewares/auth');
const trimRequest = require("trim-request");

api.post('/createConversation',trimRequest.all, check.auth, conversationController.create_open_conversation);
api.get('/getConversation',trimRequest.all, check.auth, conversationController.getConversations);
api.post('/group',trimRequest.all, check.auth, conversationController.createGroup);

// api.post('/commentPublication/:publicationId', check.auth, commentController.save);
// api.delete('/deleteComment/:publicationId', check.auth, commentController.deleteComment);
// api.get('/getComments/:publicationId/:page?', check.auth, commentController.commentPublication);
// // api.post('/upload/:id', [check.auth, uploads.single('upload0')], commentController.upload);
// // api.get('/media/:file', commentController.media);


module.exports = api;
