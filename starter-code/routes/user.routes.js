const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../configs/passport.config');

router.get('/user/:id', secure.isAuthenticated, userController.profile);

module.exports = router;
