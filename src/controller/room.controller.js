const { verifyToken } = require('../middleware/JWTAction');
const helperFn = require('../utils/helperFn');
const db = require('../models');
const room_controller = {
  roomPage:
    async (req, res) => {
      rooms = await db.Room.findAll()
      res.render('room', {
        rooms: rooms,
      })
    },
    bookRoom:
    async (req, res) => {
      try {
        let roomId = parseInt(req.query.roomId);
        let { id: userId } = verifyToken(req.cookies.token)
        let cart = {}
        let cartFetch = await db.Cart.findOne(
          {
            where: {
              userId,
              roomId,
              onCart: 1
            }
          })
        if (cartFetch) {
          let cartId = cartFetch.id;
          let quantity = cartFetch.quantity + 1;
          cart = await db.Cart.update({ quantity }, {
            where: {
              id: cartId
            }
          })
        }
        else {
          cart = await db.Cart.create({
            quantity: 1,
            userId: userId,
            roomId: roomId,
            onCart: 1,
            arrival: new Date(),
            departure: new Date(),
          })
        }
        return res.redirect('/cart')
      } catch (e) {
        console.log(e);
      }
    }

}
module.exports = room_controller