const { verifyToken } = require('../middleware/JWTAction');
const db = require('../models');
const cartOrder = require('../models/cart-order');
const catchAsync = require('../utils/errorHandle/catchAsync');
const helperfn = require('../utils/helperFn');
const Cart = require('../models/cart');

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
        let cartOrder = await db.CartOrder.findAll(
          {
            where: { orderId},
            include: [{
              model: Cart,
              as:'Cart'
            }]
          })
        console.log(cartOrder);
          return cartOrder
        // let cart = await db.Cart.findAll({
          // where: { id : cartOrder.id },
          // include: [{
          //   model: 'Order',
          //   where: { id : cartOrder.id ,id: 10 }
          // }]
        // })
        // console.log(cart);
        // res.render('order-detail', {
        //   orders
        // })
      } catch (e) {
        console.log(e);
      }
    }
}
module.exports = order_controller