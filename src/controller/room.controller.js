const service = require('../service/userService');
const helperFn = require('../utils/helperFn');
const user_controller = {
  homePage:
    (req, res) => {
      res.render("room");
    },
  handleLogin:
    async (req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      if (!email || !password) {
        // return res.status(500).json({
        //   errCode: 1,
        //   message: 'Missing input parameter(s)'
        // })
        helperFn.returnFail(req,res,message);
      }
      try {
        let userData = await service.handleLogin(email, password);
        res.status(200).json({
          errCode: userData.errCode,
          message: userData.message,
          user: userData.user ? userData.user : {}
        })
      } catch (e) {
        console.log(e);
      }
    },
  handleUpdateUser:
    async (req, res) => {
      let data = req.body;
      if (data) {
        let user = await service.handleUpdateUser(data)
        console.log(user.message);
        res.redirect('display-all-users')
      }
      else return res.send('invalid get query')
    },
  createUser:
    async (req, res) => {
      let data = await service.createUser(req.body)
      if (data.errCode) {
        return console.log(data.message)
      }
      else res.redirect('display-all-users')
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
      if(!response.errCode)
      res.redirect('display-all-users')
      else
      console.log(response.message);
    }
}
module.exports = user_controller