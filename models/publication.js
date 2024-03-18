const {Schema, model} = require('mongoose');

const publicationSchema = Schema({
    student:{
        type: Schema.ObjectId,
        ref: 'Student'
    },
    text:{
        type: String,
        required: true
    },
    file: String,
    likes:[{
        type: Schema.ObjectId,
        ref: 'Like'
    }],
    comments:[{
        type: Schema.ObjectId,
        ref: 'Comment'
    }],
    hashtags: [String],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Publication', publicationSchema);