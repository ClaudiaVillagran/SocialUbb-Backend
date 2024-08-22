const { Schema, model } = require('mongoose');

const quizSchema = Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: Schema.ObjectId,
        ref: 'Question'
    }],
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    code: {
        type: Number,
        required: true,
        unique: true 
      },
    // isPublished: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = model('Quiz', quizSchema);