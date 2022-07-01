var express = require('express');
var controller = require("../controller/cart.controller");
var router = express.Router();
router.get('/', controller.cartPage)
router.post('/checkout', controller.checkout)

module.exports = router