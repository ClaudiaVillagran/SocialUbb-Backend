const {Schema, model} = require('mongoose');

const notificationSchema = Schema({
    student: {
        type: Schema.ObjectId,
        ref: "Student"
    },
    text:{
        type: String,
        required: true
    },
    categories:{
        type: Array,
        default: ['Nueva publicación',' Nuevo comentario', 'Solicitud de amistad','Recuperar contraseña']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model('Notifications', notificationSchema);
