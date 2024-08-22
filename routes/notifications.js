const express = require('express');

const api = express.Router();
const notificationController = require('../controllers/notifications');
const check = require('../middlewares/auth');
const trimRequest = require("trim-request");

api.post('/saveNotification',trimRequest.all, check.auth, notificationController.saveNotification);
api.get('/getNotifications',trimRequest.all, check.auth, notificationController.getAllNotifications);
api.delete('/deleteNotifications',trimRequest.all, check.auth, notificationController.deleteNotification);

module.exports = api;
