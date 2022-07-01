var express = require('express');
var controller = require("../controller/user.controller");
var router = express.Router();
router.get('/', controller.userPage)

module.exports = router