const express = require('express');
const api = express.Router();
const commentController = require('../controllers/comments');
const check = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/comments/')
    },
    filename: function (req, file, cb) {
        cb(null, "com-"+Date.now()+"-"+ file.originalname)
    }
});

const uploads = multer({storage});

api.post('/save/:publication', check.auth, commentController.save);
api.delete('/deleteComment/:id/:publication', check.auth, commentController.deleteComment);
api.get('/commentPublication/:publication/:page?', check.auth, commentController.commentPublication);
api.post('/upload/:id', [check.auth, uploads.single('upload0')], commentController.upload);
api.get('/media/:file', commentController.media);

module.exports = api;