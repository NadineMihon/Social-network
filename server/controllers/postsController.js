const PostsModel = require('../models/PostsModel');

class PostsController {
    async getPosts (req, res) {
        try {
            const { role, friends = [] } = req.body || {};

            let filter = {};

            if (!role) {
                filter = { visibility: 'public' };
            } else if (role === 'admin') {
                filter = {};
            } else {
                filter = {
                    $or: [
                        { visibility: 'public' },
                        { author: { $in: friends } },
                    ],
                };
            }

            const result = await PostsModel.find(filter).sort({ createdAt: -1 });

            return res.status(200).json({ posts: result });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при получении постов' });
        }
    };

    async addPost (req, res) {
        try {
            if (!req.body.authorId) {
                return res.status(400).json({ message: 'Необходима авторизация' });
            }

            if (!req.body.content) {
                return res.status(400).json({ message: 'Пожалуйста, введите текст поста' });
            }

            if (!req.body.visibility) {
                return res.status(400).json({ message: 'Пожалуйста, выберите видимость поста' });
            }

            const postModel = new PostsModel({
                author: req.body.authorId,
                content: req.body.content,
                visibility: req.body.visibility,
            });

            await postModel.save();

            return res.status(201).json({ message: 'Пост успешно создан' });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при создании поста' });
        }
    };

    async deletePost (req, res) {
        try {
            const { postId, role, authorId } = req.body;

            const post = await PostsModel.findById(postId);

            if (!post) {
                return res.status(404).json({ message: 'Пост не найден' });
            }

            if (role !== 'admin' && authorId !== post.author.toString()) {
                return res.status(403).json({ message: 'Недостаточно прав для удаления поста' });
            }

            await post.deleteOne();

            return res.status(200).json({ message: 'Пост успешно удален' });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при удалении поста' });
        }
    };

    async toggleLike (req, res) {
        try {
            const { postId, userId } = req.body;

            const post = await PostsModel.findById(postId);

            if (!post) {
                return res.status(404).json({ message: 'Пост не найден' });
            }

            const hasLiked = post.likedBy.some((id) => id.toString() === userId);

            if (hasLiked) {
                post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
            } else {
                post.likedBy.push(userId);
            }

            await post.save();

            return res.status(200).json({
                liked: !hasLiked,
                likesCount: post.likedBy.length,
            });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при лайке' });
        }
    };
};

module.exports = new PostsController();