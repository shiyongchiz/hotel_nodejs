const { verifyToken } = require('../middleware/JWTAction');
const db = require('../models');
const cartOrder = require('../models/cart-order');
const catchAsync = require('../utils/errorHandle/catchAsync');
const helperfn = require('../utils/helperFn');
const Cart = require('../models').Cart;
const { sequelize } = require("../config/connectDB")

const order_controller = {
  orderPage:
    async (req, res) => {
      try {
        let { id: userId } = verifyToken(req.cookies.token)
        let orders = await db.Order.findAll(
          {
            where: {
              userId
            }
          })
        res.render('order', {
          orders
        })
      } catch (e) {
        console.log(e);
      }
    },
  orderDetail:
    async (req, res) => {
      try {
        let orderId = req.params.orderId
        // let cartOrder = await db.Order.findAll(
        //   {
        //     where: { id: orderId },
        //     include: [{
        //       model: db.Cart,
        //       through: {
        //         attributes: {
        //           exclude: ['CartOrder']
        //         }
        //       }
        //     }],
        //     raw: true,
        //     nest: true
        //   })

        let orderDetail = await db.Cart.findAll({
          include:[{
            model: db.Order,
            where:{
              id: orderId
            }
          },{
            model: db.Room,
          }],
          raw: true,
          nest: true
        })

        // console.log(orderDetail);
      res.render('orderDetail', {
        data: orderDetail
      })
    } catch(e) {
      console.log(e);
    }
}
}
module.exports = order_controller

