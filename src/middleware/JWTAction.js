require("dotenv").config()
const jwt = require('jsonwebtoken');

const generateJWT = (userId) => {
  let payload = {
    id: userId
  }
  let key = process.env.JWT_SECRET
  let token
  try {
    token = jwt.sign(payload, key, {
      expiresIn: '60m'
    })
  } catch (e) {
    console.log(e);
  }
  return token
}

const authenticateToken = (req, res, next) => {
  try {
    let token = req.cookies.token
    let key = process.env.JWT_SECRET;
    let user = jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.redirect('/login')
      }
      else
        next()
    })
  } catch (err) {
    console.log("expired tokeen");
  }
}


const generateJWTForVerifyRegister = (userId) => {
  let payload = {
    id: userId
  }
  let key = process.env.JWT_SECRET
  let token
  try {
    token = jwt.sign(payload, key, {
      expiresIn: '1d'
    })
  } catch (e) {
    console.log(e);
  }
  return token
}

const verifyToken = (token) => {
  try {
    let key = process.env.JWT_SECRET;
    let id = jwt.verify(token, key)
    return id
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  generateJWT,
  authenticateToken,
  generateJWTForVerifyRegister,
  verifyToken
}