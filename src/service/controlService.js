var db = require('../models/index')
const bcrypt = require("bcrypt");
const { INTEGER } = require('sequelize');
const { generateJWT } = require('../middleware/JWTAction');
const { returnSuccess, returnFail } = require('../utils/helperFn');
const catchAsync = require('../utils/errorHandle/catchAsync');
const nodemailer = require('nodemailer');

let handleLoginService = async (email, password) => {
  let userData = { token: "" };
  try {
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
        userData.errCode = 1;
        userData.message = "Wrong password, try again"
      }
    }
    else {
      userData.errCode = 1;
      userData.message = 'User not found!';

    }
    return userData
  }
  catch (e) {
    userData.errCode = 2;
    userData.message = e;
    return userData
  }
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
  try {
    // let checkEmail = await checkUserEmail(data.email)
    // if (checkEmail) {
    //   return resolve({
    //     errCode: 1,
    //     message: 'The email is already used!'
    //   })
    // }
    let hashPasswordFromBcript = await hashUserPassword(data.password);
    await db.User.create({
      userName: data.userName,
      email: data.email,
      password: hashPasswordFromBcript,
      address: data.address,
      phone: data.phone,
      image: data.image,
    })

    return {
      errCode: 0,
      message: 'Create success!'
    }
  } catch (e) {
    console.log(e)
  }
}

let deleteUser = async (userId) => {
  try {
    if (!userId) {
      return {
        errCode: 2,
        message: 'Missing input parameter(s)'
      }
    }
    let user = await db.User.destroy({
      where: { id: userId },
    })
    if (user) {
      return {
        errCode: 0,
        message: `Delete success user id: ${userId}!`,
        user
      }
    }
    else {
      return {
        errCode: 3,
        message: `User id: ${userId} not found!`
      }
    }
  } catch (e) {
    console.log(e);
  }
}
let updateUser = async (userId) => {
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
    return {
      errCode: 0,
      message: `Success!`,
      user
    }
  } catch (e) {
    console.log(e);
  }
}

let handleUpdateUser = async (data) => {
  try {
    if (!data || !data.id) {
      return {
        errCode: 2,
        message: 'Missing input parameter(s)'
      }
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
      return {
        errCode: 0,
        message: `Update success user id: ${data.id}!`,
        user
      }
    }
    else {
      return {
        errCode: 3,
        message: `User id: ${data.id} not found!`
      }
    }
  } catch (e) {
    console.log(e);
  }
}

let hashUserPassword = async (password) => {
  try {
    let saltRounds = 10;
    let hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword
  } catch (e) {
    console.log(e);
  }
}

let checkUserEmail =async (userEmail) => {
    try {
      let user = await db.User.findOne({
        attributes: ['id','email', 'password'],
        where: { email: userEmail },
        raw: true
      })
      if (user) {
        return user
      }
      else {
        return false
      }
    }
    catch (e) {
      console.log(e);
    }
}

const sendMail = (url) => {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'claudionnguyen@gmail.com',
        pass: 'qwer1234!@#$'
      }
    })

    var mailOptions = {
      from: 'claudionnguyen@gmail.com',
      to: 'zekromdb@gmail.com',
      subject: 'Sending Email using Node.js',
      text: `Link to confirm your account here: \n${url}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      let message = 'sss'
      if (error) {
        console.log(error);
      } else {
        message = 'Email sent: ' + info.response;
      }
      return message
    })
  } catch (error) {
    console.log(err);
  };

}

module.exports = {
  handleLoginService,
  getAllUsers: getAllUsers,
  createUser: createUser,
  updateUser,
  deleteUser,
  handleUpdateUser,
  sendMail
}