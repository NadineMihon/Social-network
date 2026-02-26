const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRoutes = new Router();

postsRoutes.get('/posts', postsController.getPosts);
postsRoutes.post('/add', postsController.addPost);
postsRoutes.delete('/delete', postsController.deletePost);
postsRoutes.patch('/posts/:id', postsController.toggleLike);

module.exports = postsRoutes;