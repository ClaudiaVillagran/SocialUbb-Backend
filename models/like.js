const {Schema, model} = require('mongoose');

const likeSchema = Schema({
    student: {
        type: Schema.ObjectId,
        ref: "Student"
    },
    publication: {
        type: Schema.ObjectId,
        ref: "Publication"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Like', likeSchema);