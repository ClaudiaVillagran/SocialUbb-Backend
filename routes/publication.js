const express = require('express');
const api = express.Router();
const publicationController = require('../controllers/publication');
const likeController = require('../controllers/like');
const check = require('../middlewares/auth');
const multer = require('multer');
const trimRequest = require("trim-request");
//configuracion de multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/publications/')
    },
    filename: function (req, file, cb) {
        cb(null, "pub-"+Date.now()+"-"+ file.originalname)
    }
});

const uploads = multer({storage});

api.post('/save',trimRequest.all, check.auth, publicationController.save);
api.get('/detailPublication/:publicationId',trimRequest.all, check.auth, publicationController.detailPublication);
api.get('/publicationWithLike/:publicationId',trimRequest.all, check.auth, publicationController.publicationWithLike)
api.delete('/deletePublication/:publicationId',trimRequest.all, check.auth, publicationController.deletePublication);
api.get('/publicationStudent/:id/:page?',trimRequest.all, check.auth, publicationController.publicationStudent);
api.post('/upload/:id',trimRequest.all, [check.auth, uploads.single('upload0')], publicationController.upload);
api.get('/media/:file',trimRequest.all, publicationController.media);
api.get('/feed/:page?',trimRequest.all, check.auth, publicationController.feed);

module.exports = api;