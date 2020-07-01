const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router
    .route('/')
    .get(UserController.getUsers);

router
    .route('/login')
    .post(UserController.login);

router
    .route('/register')
    .post(UserController.register);

router
    .route('/me')
    .get(UserController.getOwnInfo)
    .put(UserController.updateOwnInfo)
    .delete(UserController.unregister);

router
    .route('/:id')
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports = router;
