const express = require('express');
const api = express.Router();
const projectController = require('../controllers/project');
const likeController = require('../controllers/like');
const check = require('../middlewares/auth');
const multer = require('multer');
const trimRequest = require("trim-request");
//configuracion de multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/projects/')
    },
    filename: function (req, file, cb) {
        cb(null, "pub-" + Date.now() + "-" + file.originalname)
    }
});

const uploads = multer({ storage });

api.post('/save', trimRequest.all, check.auth, projectController.save);
api.get('/detailProject/:projectId', trimRequest.all, check.auth, projectController.detailProject);
api.get('/projectWithLike/:projectId', trimRequest.all, check.auth, projectController.projectWithLike)
api.delete('/deleteProject/:projectId', trimRequest.all, check.auth, projectController.deleteProject);
api.get('/projectStudent/:id/:page?', trimRequest.all, check.auth, projectController.projectStudent);
api.post('/upload/:id', trimRequest.all, [check.auth, uploads.single('upload0')], projectController.upload);
api.get('/media/:file', trimRequest.all, projectController.media);
api.get('/feed/:page?', trimRequest.all, check.auth, projectController.feed);

module.exports = api;