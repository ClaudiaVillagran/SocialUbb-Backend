const { Schema, model } = require('mongoose');

const questionSchema = Schema({
    text: {
        type: String,
        required: true
    },
    options: [{ 
        type: String, 
        required: true 
    }],
    correctOptionIndex: { 
        type: Number, 
        required: true 
    },
    quiz: {
        type: Schema.ObjectId,
        ref: 'Quiz', // Nombre del modelo de quiz
        required: true
    }
});

module.exports = model('Question', questionSchema);