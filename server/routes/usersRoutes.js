const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoutes = new Router();

usersRoutes.get('/user', usersController.getUser);
usersRoutes.post('/add', usersController.addUser);
usersRoutes.patch('/user/:id/addFriend', usersController.addFriend);
usersRoutes.patch('/user/:id/removeFriend', usersController.removeFriend);

module.exports = usersRoutes;