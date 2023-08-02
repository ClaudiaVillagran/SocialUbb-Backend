const {Schema, model} = require('mongoose');

const commentSchema = Schema({
    student: {
        type: Schema.ObjectId,
        ref: "Student"
    },
    publication: {
        type: Schema.ObjectId,
        ref: "Publication"
    },
    text:{
        type: String,
        required: true
    },
    image: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model('Comment', commentSchema);