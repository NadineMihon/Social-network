const { Schema, model } = require('mongoose');

const CommentsSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Пост обязателен!']
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Автор обязателен!']
        },
        content: {
            type: String,
            required: [true, 'Комментарий обязателен!']
        },
    },
    { timestamps: true }
);

module.exports = model('Comments', CommentsSchema);