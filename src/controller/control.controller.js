const { generateJWTForVerifyRegister, verifyToken } = require('../middleware/JWTAction');
const db = require('../models');
const service = require('../service/controlService');
const catchAsync = require('../utils/errorHandle/catchAsync');
const helperfn = require('../utils/helperFn');


const control_controller = {

  handleLogin:
    catchAsync(async (err, req, res) => {
      try {
        let email = req.body.email;
        let password = req.body.password;
        // if (!email || !password) {
        //   let err = 'Missing input parameter(s)' //use Joi to validate
        //   helperfn.returnFail(req, res, err)
        // }

        let userData = await service.handleLoginService(email, password);
        res.cookie('token', userData.token, {
          // httpOnly: true,
        })
        if (userData.errCode != 0) {
          return res.redirect(`/login?err=${userData.message}&email=${email}`)
        }
        else return res.redirect('/')
      } catch (e) {
        console.log(e);
        return helperfn.returnFail(req, res, e)
      }
    }),

  handleUpdateUser:
    catchAsync(async (req, res) => {
      let data = req.body;
      if (data) {
        let user = await service.handleUpdateUser(data)
        console.log(user.message);
        res.redirect('display-all-users')
      }
      else {
        err = 'invalid get query'
        return helperfn.returnFail(req, res, err)
      }
    }),
  createUser:
    async (req, res) => {
      let data = await service.createUser(req.body)
      if (data.errCode) {
        return console.log(data.message)
      }
      // else res.redirect('display-all-users')
      else {
        try {
          let user = await db.User.findOne({
            where: { email: req.body.email },
            attributes: {
              exclude: ['password']
            },
          });

          const emailToken = generateJWTForVerifyRegister(user.id)
          const url = `http://localhost:8080/user/confirmation/${emailToken}`
          let message = service.sendMail(url)
          if (message) {
            return res.send(message + '\nplease go to the email to confirm registry')
          }
          else {
            console.log(message);
            return res.send(message + '\nsend email fail!')
          }
        } catch (error) {
          res.send(error)
        }
      }
    },
  displayUsers:
    async (req, res) => {
      let userId = req.query.id;
      let data = await service.getAllUsers(userId)
      res.render("user/displayUsers", {
        data: data.users
      })
    },
  updateUser:
    async (req, res) => {
      let userId = req.query.id;
      let data = await service.updateUser(userId)
      res.render("user/updateUserById", {
        data: data.user
      })
    },
  deleteUser:
    async (req, res) => {
      let userId = req.query.id;
      let response = await service.deleteUser(userId)
      if (!response.errCode)
        res.redirect('display-all-users')
      else
        console.log(response.message);
    },
  confirmRegister:
    async (req, res) => {
      try {
        const { id: userId } = verifyToken(req.params.token)
        console.log(userId);
        let user = await db.User.update({ status: 'success' }, {
          where: { id: userId }
        })
        res.send('Verify complete')
      } catch (e) {
        res.send(e)
      }
    }
}
module.exports = control_controller