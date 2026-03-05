const { Router } = require('express');
const commentsController = require('../controllers/commentsController');

const commentsRoutes = new Router();

commentsRoutes.post('/list', commentsController.getComments);
commentsRoutes.post('/add', commentsController.addComment);
commentsRoutes.delete('/delete', commentsController.deleteComment);

module.exports = commentsRoutes;