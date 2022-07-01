var express=require('express');

var controller=require("../controller/room.controller");

var router= express.Router();

router.get('/',controller.roomPage)
router.get('/book-room',controller.bookRoom)

module.exports= router