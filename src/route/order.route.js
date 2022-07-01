var express = require('express');
var controller = require("../controller/order.controller");
var router = express.Router();
router.get('/', controller.orderPage)
router.get('/:orderId', controller.orderDetail)

module.exports = router