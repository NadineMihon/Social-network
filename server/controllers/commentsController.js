const CommentsModel = require('../models/CommentsModel');

class CommentsController {
    async getComments (req, res) {
        try {
            if (!req.body.postId) {
                return res.status(400).json({ message: 'Не указан postId' });
            }

            const result = (await CommentsModel.find({ post: req.body.postId })).sort({ createdAt: 1 });

            return res.status(200).json({ comments: result });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при получении комментариев' });
        }
    };

    async addComment (req, res) {
        try {
            const { postId, authorId, content } = req.body;

            if (!postId) {
                return res.status(400).json({ message: 'Пожалуйста, выберите пост' });
            }

            if (!authorId) {
                return res.status(400).json({ message: 'Необходима авторизация' });
            }

            if (!content) {
                return res.status(400).json({ message: 'Пожалуйста, введите текст комментария' });
            }

            const commentModel = new CommentsModel({
                post: postId,
                author: authorId,
                content: content,
            });

            await commentModel.save();

            return res.status(201).json({ message: 'Комментарий успешно создан' });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при создании комментария' });
        }
    };

    async deleteComment (req, res) {
        try {
            const { commentId, role, authorId } = req.body;

            const comment = await CommentsModel.findById(commentId);

            if (!comment) {
                return res.status(404).json({ message: 'Комментарий не найден' });
            }

            if (role !== 'admin' && authorId !== comment.author.toString()) {
                return res.status(403).json({ message: 'Недостаточно прав для удаления комментария' });
            }

            await comment.deleteOne();

            return res.status(200).json({ message: 'Комментарий успешно удален' });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка при удалении комментария' });
        }
    };
};

module.exports = new CommentsController();