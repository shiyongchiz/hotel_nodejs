var express=require('express');
var controller=require("../controller/control.controller");
var router= express.Router();
const validate = require('../validate/validate')


  router.post('/login',validate.handleLoginValidate,controller.handleLogin)
  router.get('/display-all-users',controller.displayUsers)
  router.get('/update-user',controller.updateUser)
  router.get('/delete-user',controller.deleteUser)
  router.post('/create-user',controller.createUser)
  router.post('/handle-update-user',controller.handleUpdateUser)
  router.get('/confirmation/:token', controller.confirmRegister)

module.exports= router