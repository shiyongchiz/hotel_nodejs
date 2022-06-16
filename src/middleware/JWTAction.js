require("dotenv").config()
const jwt = require('jsonwebtoken');

const generateJWT = (email) => {
  let payload = {
    email
  }
  let key = process.env.JWT_SECRET
  let token
  try {
    token = jwt.sign(payload, key, {
      expiresIn: '15s'
    })
  } catch (e) {
    console.log(e);
  }
  return token
}

const authenticateToken = (req, res, next) => {
  try {
    let token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        message: 'token cookie are not set'
      })
    }
    let key = process.env.JWT_SECRET;
    let user = jwt.verify(token, key)
    next()
  } catch (err) {
    // res.clearCookie('token')
    // return res.status(403).json('token expireddddd')
    console.log("expired tokeen");
    next(err)
  }
}

module.exports = {
  generateJWT,
  authenticateToken
}