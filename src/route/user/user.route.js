const express = require('express');
const { userPage } = require('../../controller/user/user.controller');

const router = express.Router();
router.get('/', userPage);

module.exports = router;
