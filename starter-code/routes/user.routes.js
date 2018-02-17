const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../configs/passport.config');

//router.get('/user/:id', secure.isAuthenticated, userController.profile);

//router.get('/user/:id/edit', secure.isAuthenticated, userController.edit);

router.get('/', userController.index);

router.get('/user/:id/edit', userController.edit);
router.post('/user/:id', userController.update);

router.post('/user/:id/delete', userController.delete);

module.exports = router;
