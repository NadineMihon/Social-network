const { Schema, model } = require('mongoose');

const PostsSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:[true, 'Пользователь обязателен!']
        },
        content: {
            type: String,
            required: [true, 'Контент обязателен!']
        },
        visibility: {
            type: String,
            enum: ['public', 'friends'], 
            default: 'public'
        },
        likedBy: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
    },
    { timestamps: true }
);

module.exports = model('Posts', PostsSchema);