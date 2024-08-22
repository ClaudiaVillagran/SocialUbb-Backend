const express = require('express');
const api = express.Router();
const likeController = require('../controllers/likeProject');
const check = require('../middlewares/auth');
const trimRequest = require("trim-request");

api.post('/likeProject/:projectId',trimRequest.all, check.auth, likeController.likeProject);
api.delete('/unlikeProject/:project',trimRequest.all, check.auth, likeController.unlikeProject);
api.get('/getLikesProject/:project/:page?',trimRequest.all, likeController.getLikesProject);

module.exports = api;