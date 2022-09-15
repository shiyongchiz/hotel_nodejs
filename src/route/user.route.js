const express = require('express');
const controller = require('../controller/user.controller');
const { userPage } = require('../controller/user.controller');

const router = express.Router();
router.get('/', controller.userPage);

module.exports = router;
