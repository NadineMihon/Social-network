const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRoutes = new Router();

postsRoutes.post('/list', postsController.getPosts);
postsRoutes.post('/add', postsController.addPost);
postsRoutes.delete('/delete', postsController.deletePost);
postsRoutes.patch('/:id/like', postsController.toggleLike);

module.exports = postsRoutes;