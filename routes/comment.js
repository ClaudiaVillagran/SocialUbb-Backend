const express = require('express');
const api = express.Router();
const commentController = require('../controllers/comments');
const check = require('../middlewares/auth');
const multer = require('multer');
const trimRequest = require("trim-request");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/comments/')
    },
    filename: function (req, file, cb) {
        cb(null, "com-"+Date.now()+"-"+ file.originalname)
    }
});

const uploads = multer({storage});

api.post('/commentPublication/:publicationId',trimRequest.all, check.auth, commentController.save);
api.delete('/deleteComment/:commentId/:publicationId',trimRequest.all, check.auth, commentController.deleteComment);
api.get('/getComments/:publicationId/:page?',trimRequest.all, check.auth, commentController.commentPublication);

api.get('/getComment/:commentId',trimRequest.all, check.auth, commentController.commentById);
// api.post('/upload/:id', [check.auth, uploads.single('upload0')], commentController.upload);
// api.get('/media/:file', commentController.media);

module.exports = api;