const express = require('express');

const controller = require('../../controller/room/room.controller');

const router = express.Router();

router.get('/', controller.roomPage);
router.get('/book-room', controller.bookRoom);

module.exports = router;
