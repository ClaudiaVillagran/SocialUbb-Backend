const express = require('express');
const api = express.Router();
const likeController = require('../controllers/like');
const check = require('../middlewares/auth');
const trimRequest = require("trim-request");

api.post('/likePublication/:publicationId',trimRequest.all, check.auth, likeController.likePublication);
api.delete('/unlikePublication/:publication',trimRequest.all, check.auth, likeController.unlikePublication);
api.get('/getLikesPublication/:publication/:page?',trimRequest.all, likeController.getLikesPublication);

module.exports = api;