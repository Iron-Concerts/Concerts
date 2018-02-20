const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../configs/passport.config');
const passport = require('passport');

router.get('/signup', secure.nonAuthenticated, authController.signup);
router.post('/signup', secure.nonAuthenticated, authController.doSignup);

router.post('/auth/google', passport.authenticate('google-auth', {scope: ['openid', 'profile', 'email']}));
router.get('/auth/:provider/cb', authController.loginWithProviderCallback);

router.get('/login', secure.nonAuthenticated, authController.login);
router.post('/login', secure.nonAuthenticated, authController.doLogin);

router.get('/logout', secure.isAuthenticated, authController.logout);

module.exports = router;
