const { verifyToken } = require("../middleware/JWTAction");
// const helperFn = require("../../utils/helperFn");
const db = require("../models");

const roomPage = async (req, res) => {
  const rooms = await db.Room.findAll();
  res.render("room", {
    rooms,
  });
};
const bookRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.query.roomId, 10);
    const { id: userId } = verifyToken(req.cookies.token);
    let cart = {};
    const cartFetch = await db.Cart.findOne({
      where: {
        userId,
        roomId,
        onCart: 1,
      },
    });
    if (cartFetch) {
      const cartId = cartFetch.id;
      const quantity = cartFetch.quantity + 1;
      cart = await db.Cart.update(
        { quantity },
        {
          where: {
            id: cartId,
          },
        }
      );
    } else {
      cart = await db.Cart.create({
        quantity: 1,
        userId,
        roomId,
        onCart: 1,
        arrival: new Date(),
        departure: new Date(),
      });
    }
    console.log(cart);
    return res.redirect("/cart");
  } catch (e) {
    console.log(e);
    return e;
  }
};
module.exports = { roomPage, bookRoom };
