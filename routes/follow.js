const express = require('express');
const api = express.Router();
const followController = require('../controllers/follow');
const check = require('../middlewares/auth');
const trimRequest = require("trim-request");

//definir rutas
api.post('/save',trimRequest.all, check.auth, followController.save);
api.delete('/unFollow/:id',trimRequest.all, check.auth, followController.unFollow);
api.get('/following/:id?/:page?',trimRequest.all, check.auth, followController.following);
api.get('/followers/:id?/:page?',trimRequest.all, check.auth, followController.followers);

//exportar rutas
module.exports = api;