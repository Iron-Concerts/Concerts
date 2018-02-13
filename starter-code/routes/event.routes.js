const express = require('express');
const router = express.Router();
//const secure = require('../');

const eventController = require('../controllers/event.controller');

router.get('/events', eventController.index);
router.post('/event', eventController.create);

module.exports = router;
