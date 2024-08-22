const Notification = require("../models/notifications");

const saveNotification = async (req, res) => {
  try {
    const params = req.body;
    // console.log('params notif', params);
  
    if (!params.category) {
      return res.status(400).send("Debe ingresar una categoria");
    }
  
    const newNotificationData = {
      student: req.user.studentId,
      fromStudent: params.fromStudent._id,
      category: params.category,
    };
    if (params.category !=='NewFollow') {
      newNotificationData.project = params.project;
    }
  
    const newNotification = new Notification(newNotificationData);
  
    // console.log('newNotification', newNotification);
    // console.log(newComment);
    await newNotification.save();
    // console.log('newNotification', newNotification);
    // console.log('newNotification after save', newNotification);
    const savedNotification = await Notification.findById(newNotification._id)
      .populate("fromStudent project");
  
    res.status(200).send({
      status: "success",
      message: "Notificación creada correctamente",
      notification: savedNotification
    });
  
  } catch (error) {
    res.status(500).send("Error al guardar la notificación");
  }
  
};

const getAllNotifications = async (req, res) => {
  const studentId = req.user.studentId;
  console.log(studentId)
  try {
    const notifications = await Notification.find({ student: studentId })
      .sort("-created_at")
      .populate("student", "-__v -email -password")
      .populate("fromStudent", "-__v -email -password")
      .exec();

    console.log(notifications)

    return res.status(200).send({
      status: "success",
      message: "Notificaciones",
      notifications
    });
  } catch (error) {
    console.error('Error al obtener las notificaciones:', error);
    res.status(500).send({ status: "error", message: "Error al obtener las notificaciones" });
  }

};

const deleteNotification = async (req, res) => {
  const notificationId = req.user.studentId;

  try {
    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).send({
        status: "error",
        message: "Notificación no encontrada"
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Notificación eliminada",
      notification
    });
  } catch (error) {
    console.error('Error al eliminar la notificación:', error);
    return res.status(500).send({
      status: "error",
      message: "Error al eliminar la notificación"
    });
  }
};

module.exports = {
  saveNotification,
  getAllNotifications,
  deleteNotification,
};
