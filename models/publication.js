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
    image: String,
    likes:[{
        type: Schema.ObjectId,
        ref: 'Like'
    }],
    categories: [String],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Publication', publicationSchema);