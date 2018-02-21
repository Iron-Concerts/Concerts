const express = require('express');
const router = express.Router();
const secure = require('../configs/passport.config');
const multer = require('multer');
const upload = multer({dest: 'public/img'});

const eventController = require('../controllers/event.controller');

router.get('/events', eventController.index);
router.get('/event', secure.isAuthenticated, eventController.showFormCreate);
router.get('/events/all', eventController.getAll);
router.post('/event', secure.isAuthenticated, upload.single('pic'), eventController.create);
router.get('/:id/edit', secure.isAuthenticated, eventController.showEdit);
router.post('/:id/edit', secure.isAuthenticated, upload.single('pic'), eventController.update);
router.get('/:id/delete', secure.isAuthenticated, eventController.delete);

module.exports = router;
