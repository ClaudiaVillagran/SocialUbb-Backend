const express = require('express');
const api = express.Router();
const multer = require('multer');
const studentController = require ('../controllers/student');
const check = require('../middlewares/auth');
const trimRequest = require("trim-request");
//configuracion de multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profilePictures/')
    },
    filename: function (req, file, cb) {
        cb(null, "profilePicture-"+Date.now()+"-"+ file.originalname)
    }
});

const uploadImage = multer({storage});

api.post("/register",trimRequest.all, studentController.register);
api.post("/login",trimRequest.all, studentController.login);
api.post("/refreshtoken",trimRequest.all, studentController.refreshToken);
api.get("/profile/:id",trimRequest.all, check.auth, studentController.profile);
//page es un parametro opcional
api.get("/list",trimRequest.all, check.auth, studentController.list);
api.put("/update",trimRequest.all, check.auth, studentController.update);
//[check.auth, uploadImage.single("upload0")]  ---> los corchetes para usar varios middlewares
api.post("/uploadImage",trimRequest.all, [check.auth, uploadImage.single("upload0")], studentController.uploadImage);
api.get("/profilePicture/:file",trimRequest.all, studentController.profilePicture);
api.get('/counter/:id',trimRequest.all, check.auth, studentController.counter);
api.get("/",trimRequest.all, check.auth, studentController.searchUsers);
module.exports = api;