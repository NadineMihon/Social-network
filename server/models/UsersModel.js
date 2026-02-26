const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email обязателен!']
    },
    username: {
        type: String,
        required: [true, 'Имя пользователя обязательно!']
    },
    passwordHash: {
        type: String,
        required: [true, 'Пароль обязателен!']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    friends: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }
});

module.exports = model('Users', UsersSchema);