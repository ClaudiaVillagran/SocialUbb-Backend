const {Schema, model} = require('mongoose');

const notificationSchema = Schema({
    student: { // El estudiante que recibe la notificación
        type: Schema.ObjectId,
        ref: "Student",
        required: true
    },
    fromStudent: { // El estudiante que ejecuta la acción
        type: Schema.ObjectId,
        ref: "Student",
        required: true
    },
    category: {
        type: String,
        enum: ['NewPublication', 'NewComment', 'NewFollow', 'NewLike','NewPartner'],
        required: true
    },
    project:{
        type: Schema.ObjectId,
        ref: "Project",
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model('Notifications', notificationSchema);
