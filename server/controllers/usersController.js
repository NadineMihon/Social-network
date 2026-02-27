const UsersModel = require('../models/UsersModel');
const bcrypt = require('bcrypt');

class UsersController {
    async loginUser (req, res) {
        try {
            const user = await UsersModel.findOne({ email: req.body.email });

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const isValid = await bcrypt.compare(req.body.password, user.passwordHash);

            if (!isValid) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const { passwordHash, ...userData } = user._doc;
            return res.status(200).json(userData);
        } catch (e) {
            return res.status(500).json({ message: 'Возникла ошибка при авторизации' });
        }
    };

    async getUser (req, res) {
        try {
            const user = await UsersModel.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const { passwordHash, ...userData } = user._doc;
            return res.status(200).json(userData);
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при получении пользователя' });
        }
    };

    async addUser (req, res) {
        try {
            if (!req.body.name) {
                return res.status(400).json({ message: 'Пожалуйста, введите имя пользователя' });
            }

            if (!req.body.email) {
                return res.status(400).json({ message: 'Пожалуйста, введите email' });
            }

            const existingUser = await UsersModel.findOne({ email: req.body.email });

            if (existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }

            if(!req.body.password) {
                return res.status(400).json({ message: 'Пожалуйста, введите пароль' });
            }

            const username = `${req.body.name} ${req.body.surname}`;
            const passwordHash = await bcrypt.hash(req.body.password, 10);

            const userModel = new UsersModel({
                email: req.body.email,
                username,
                passwordHash,
            });

            await userModel.save();

            return res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });

        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при регистрации' });
        }
    };

    async addFriend (req, res) {
        try {
            const { userId, friendId } = req.body;

            const user = await UsersModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const isFriend = user.friends.some((id) => id.toString() === friendId);

            if (isFriend) {
                return res.status(400).json({ message: 'Пользователь уже в друзьях' });
            }

            user.friends.push(friendId);
            await user.save();

            return res.status(200).json({ friends: user.friends });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при добавлении друга' });
        }
    };

    async removeFriend (req, res) {
        try {
            const { userId, friendId } = req.body;

            const user = await UsersModel.findById(userId);

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const isFriend = user.friends.some((id) => id.toString() === friendId);

            if (!isFriend) {
                return res.status(400).json({ message: 'Пользователь в друзьях отсутствует'});
            }

            user.friends = user.friends.filter((id) => id.toString() !== friendId);
            await user.save();

            return res.status(200).json({ friends: user.friends });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при удалении друга' });
        }
    };

    async getFriendSuggestions (req, res) {
        try {
            const { id } = req.params;
            const { limit = 5 } = req.query;

            const user = await UsersModel.findById(id).select('friends');

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const excludedIds = [id, ...user.friends];

            const suggestions = await UsersModel.aggregate([
                { $match: { _id: { $nin: excludedIds } } },
                { $sample: { size: Number(limit) } },
                {
                    $project: {
                        passwordHash: 0,
                        email: 0,
                    },
                },
            ]);

            return res.status(200).json({ users: suggestions });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при предложении друзей' });
        }
    };
};

module.exports = new UsersController();