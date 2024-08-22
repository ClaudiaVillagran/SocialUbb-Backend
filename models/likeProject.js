const {Schema, model} = require('mongoose');

const likeProjectSchema = Schema({
    student: {
        type: Schema.ObjectId,
        ref: "Student"
    },
    project: {
        type: Schema.ObjectId,
        ref: "Project"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('LikeProject', likeProjectSchema);