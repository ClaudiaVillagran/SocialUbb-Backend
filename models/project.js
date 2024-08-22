const {Schema, model} = require('mongoose');

const projectSchema = Schema({
    student:{
        type: Schema.ObjectId,
        ref: 'Student'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    file: [],
    place: String,
    date:{
        type: Date,
    },
    likes:[{
        type: Schema.ObjectId,
        ref: 'Like'
    }],
    comments:[{
        type: Schema.ObjectId,
        ref: 'Comment'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Project', projectSchema);