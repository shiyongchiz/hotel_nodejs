require("dotenv").config()
const jwt = require('jsonwebtoken');

const createJWT = () => {
  let payload = {
    name: 'claudion',
    age: 18
  }

  let key = process.env.JWT_SECRET
  let token
  try {
    token = jwt.sign(payload, key)
  } catch (e) {
    console.log(e);
  }
  console.log('create token success', token);
  return token
}

const verifyToken= (token)=>{
  let key = process.env.JWT_SECRET;
  let data= ''
  try {
    data= jwt.verify(token,key)
  } catch (e) {
    console.log(e);
  }
  // jwt.verify(token, key , function(err, decoded) {
  //   if (err) {
  //     console.log(err);
  //     return data
  //     /*
  //       err = {
  //         name: 'TokenExpiredError',
  //         message: 'jwt expired',
  //         expiredAt: 1408621000
  //       }
  //     */
  //   }
  //   return decoded
  // });
  return data
}

module.exports = {
  createJWT,
  verifyToken
}