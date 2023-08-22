const express = require('express');
const api = express.Router();
const likeController = require('../controllers/like');
const check = require('../middlewares/auth');

api.post('/likePublication/:publicationId', check.auth, likeController.likePublication);
api.delete('/unlikePublication/:publication', check.auth, likeController.unlikePublication);
api.get('/getLikesPublication/:publication/:page?', likeController.getLikesPublication);

module.exports = api;