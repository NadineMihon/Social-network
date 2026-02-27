const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoutes = new Router();

usersRoutes.post('/login', usersController.loginUser);
usersRoutes.get('/:id', usersController.getUser);
usersRoutes.post('/add', usersController.addUser);
usersRoutes.patch('/:id/addFriend', usersController.addFriend);
usersRoutes.patch('/:id/removeFriend', usersController.removeFriend);
usersRoutes.get('/:id/suggestions', usersController.getFriendSuggestions);

module.exports = usersRoutes;