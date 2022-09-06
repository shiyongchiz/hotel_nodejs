const { verifyToken } = require('../middleware/JWTAction');
const db = require('../models');
const catchAsync = require('../utils/errorHandle/catchAsync');
const helperfn = require('../utils/helperFn');
const { sequelize } = require("../config/connectDB")

const cart_controller = {
  cartPage:
    async (req, res) => {
      try {
        let { id: userId } = verifyToken(req.cookies.token)
        let carts = await db.Cart.findAll(
          {
            where: {
              userId,
              onCart: 1
            }
          })
        for (let cart of carts) {
          cart.Room = await db.Room.findOne(
            {
              where: {
                id: cart.roomId,
              }
            })
        }
        res.render('cart', {
          carts,userId
        })
      } catch (e) {
        console.log(e);
      }
    },
  checkout:
    async (req, res) => {
      try {
        //create order
        let code = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substring(1, 6);
        let date = new Date();
        let total = parseFloat(req.body.total);
        let userId = parseInt(req.body.userId);
        let payment = 'cash';

        let order = await db.Order.create({
          code,
          date,
          total,
          userId,
          payment
        })
       let orderId= order.dataValues.id;

       

        //update card quantity and also card-order table
        let quantity = req.body.quantity
        let cartIds = Object.keys(quantity)
        for (cartId of cartIds) {
          let id = parseInt(cartId.substring(2))
          if (quantity[cartId] == 'false') {
            await db.Cart.destroy({
              where: { id: id },
            })
          }
          else {
            //update cart
            await sequelize.query(`UPDATE Cart SET quantity = quantity +${quantity[cartId]}, onCart = 0  WHERE id=${id}`, {
              model: db.Cart,
              type: sequelize.QueryTypes.INSERT
            })

            //create cart-order
            await db.CartOrder.create({
              cartId: id,
              orderId: orderId
            })
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
}
module.exports = cart_controller