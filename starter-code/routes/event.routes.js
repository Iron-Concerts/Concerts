const express = require('express');
const router = express.Router();
//const secure = require('../');

const eventController = require('../controllers/event.controller');

router.get('/', eventController.index);
router.post('/admin/create', eventController.create);

module.exports = router;
