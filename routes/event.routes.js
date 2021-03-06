const express = require('express');
const router = express.Router();
//const secure = require('../');
const multer = require('multer');
const upload = multer({dest: 'public/img'});

const eventController = require('../controllers/event.controller');

router.get('/events', eventController.index);
router.get('/event', eventController.showFormCreate);
router.get('/events/userevents', eventController.getUserEvents);
router.get('/events/all', eventController.getAll);
router.post('/search', eventController.search);
router.post('/event', upload.single('pic'), eventController.create);
router.get('/:id/edit', eventController.showEdit);
router.post('/:id/edit', upload.single('pic'), eventController.update);
router.get('/:id/delete', eventController.delete);

module.exports = router;
