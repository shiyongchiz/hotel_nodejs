var express=require('express');

var controller=require("../controller/user.controller");

var router= express.Router();

router.post('/login',controller.handleLogin)
router.get('/',controller.homePage)
router.get('/display-all-users',controller.displayUsers)
router.get('/update-user',controller.updateUser)
router.get('/delete-user',controller.deleteUser)
router.post('/create-user',controller.createUser)
router.post('/handle-update-user',controller.handleUpdateUser)

module.exports= router