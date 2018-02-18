const express = require('express');
const router = express.Router();
//const secure = require('../');
const multer = require('multer');
const upload = multer({dest: 'public/img'});

const eventController = require('../controllers/event.controller');

router.get('/events', eventController.index);
router.get('/event', eventController.showFormCreate);
//router.post('/event', eventController.create);
router.post('/event', upload.single('pic'), eventController.create);
router.get('/edit/:id', eventController.showEdit);
//router.post('/event', eventController.edit);

module.exports = router;
