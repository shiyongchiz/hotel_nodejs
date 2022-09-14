var express = require('express');
var controller = require("../controller/control.controller");
var router = express.Router();
const validate = require('../validate/validate')
const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: (req, file, cb)=>{
//     cb(null, 'src/public/uploads')
//   },
//   filename: (req, file, cb)=>{
//     console.log(req.file, req.body);
//     cb(null, 'src/public/uploads')
//   },
// })
const upload = multer({ dest: 'src/public/uploads',  })

router.get('/lang/:lang', controller.changeLanguage);
router.post('/login', validate.handleLoginValidate, controller.handleLogin)
router.get('/logout', controller.handleLogout)
router.get('/display-all-users', controller.displayUsers)
router.get('/update-user', controller.updateUser)
router.get('/delete-user', controller.deleteUser)
router.post('/create-user', upload.single('image'), controller.createUser)
router.post('/handle-update-user', controller.handleUpdateUser)
router.get('/confirmation/:token', controller.confirmRegister)

module.exports = router