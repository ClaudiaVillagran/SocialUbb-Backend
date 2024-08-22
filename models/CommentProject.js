const {Schema, model} = require('mongoose');

const commentProjectSchema = Schema({
    student: {
        type: Schema.ObjectId,
        ref: "Student"
    },
    project: {
        type: Schema.ObjectId,
        ref: "Project"
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
module.exports = model('CommentProject', commentProjectSchema);