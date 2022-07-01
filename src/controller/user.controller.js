const { verifyToken } = require('../middleware/JWTAction');
const db = require('../models');
const catchAsync = require('../utils/errorHandle/catchAsync');
const helperfn = require('../utils/helperFn');


const user_controller = {
  userPage:
    async (req, res) => {
      try {
        let { id: userId } = verifyToken(req.cookies.token)
        let user = await db.User.findOne(
          {
            where: {
              userId
            }
          })
        res.render('information', {
          user
        })
      } catch (e) {
        console.log(e);
      }
    }
}
module.exports = user_controller