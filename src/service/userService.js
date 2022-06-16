var db = require('../models/index')
const bcrypt = require("bcrypt");
const { INTEGER } = require('sequelize');
const { generateJWT } = require('../middleware/JWTAction');

let handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let userFetch = await checkUserEmail(email);
      if (userFetch) {
        //compare password
        let check = bcrypt.compareSync(password, userFetch.password)
        if (check) {
          userData.token = generateJWT(userFetch.id)
          userData.errCode = 0;
          userData.message = "OK"
        }
        else {
          userData.errCode = 3;
          userData.message = "Wrong password, try again"
        }
      }
      else {
        userData.errCode = 1;
        userData.message = 'User not found!';

      }
      resolve(userData)
    }
    catch (e) {

      reject(e);
    }
  })
}

let getAllUsers = async (userId) => {
  try {
    if (userId instanceof INTEGER) {
      return {
        errCode: 1,
        message: `Invalid input parameter(s)`,
        users
      }
    }
    let users = []
    if (!userId) {
      users = await db.User.findAll({
        attributes: {
          exclude: ['password']
        }
        // attributes: ['userName','email', 'address']
      })
    }
    else if (userId) {
      user = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ['password']
        },
      })
      users[0] = user
    }
    return {
      errCode: 0,
      message: `Success!`,
      users
    }
  } catch (e) {
    return e
  }
}

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkUserEmail(data.email)
      if (checkEmail) {
        return resolve({
          errCode: 1,
          message: 'The email is already used!'
        })
      }
      let hashPasswordFromBcript = await hashUserPassword(data.password);
      await db.User.create({
        userName: data.userName,
        email: data.email,
        password: hashPasswordFromBcript,
        address: data.address,
        phone: data.phone,
        image: data.image,
      })

      resolve({
        errCode: 0,
        message: 'Create success!'
      })
    } catch (e) {
      reject(e)
    }
  })
}

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return resolve({
          errCode: 2,
          message: 'Missing input parameter(s)'
        })
      }
      let user = await db.User.destroy({
        where: { id: userId },
      })
      if (user) {
        return resolve({
          errCode: 0,
          message: `Delete success user id: ${userId}!`,
          user
        })
      }
      else {
        return resolve({
          errCode: 3,
          message: `User id: ${userId} not found!`
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
let updateUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (false) {
        return resolve({
          errCode: 1,
          message: `Invalid input parameter(s)`,
          users
        })
      }
      let user = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ['password']
        },
      })
      return resolve({
        errCode: 0,
        message: `Success!`,
        user
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.id) {
        return resolve({
          errCode: 2,
          message: 'Missing input parameter(s)'
        })
      }
      data.password = await hashUserPassword(data.password);
      let user = await db.User.update(data, {
        where: { id: data.id }
      })
      if (user) {
        // user.firstName = data.firstName
        // user.lastName = data.lastName
        // user.address = data.address

        // await user.save()  //update user in database
        return resolve({
          errCode: 0,
          message: `Update success user id: ${data.id}!`,
          user
        })
      }
      else {
        resolve({
          errCode: 3,
          message: `User id: ${data.id} not found!`
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let saltRounds = 10;
      let hashPassword = await bcrypt.hash(password, saltRounds);
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        attributes: ['email', 'password'],
        where: { email: userEmail },
        raw: true
      })
      if (user) {
        resolve(user)
      }
      else {
        resolve(false)
      }
    }
    catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  handleLogin: handleLogin,
  getAllUsers: getAllUsers,
  createUser: createUser,
  updateUser,
  deleteUser,
  handleUpdateUser
}