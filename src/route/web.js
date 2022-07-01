var controlRouter = require("./control.route.js");
var roomRouter = require("./room.route.js");
var cartRouter = require("./cart.route.js");
var userRouter = require("./user.route.js");
var orderRouter = require("./order.route.js");
const { authenticateToken } = require("../middleware/JWTAction.js");
const e = require("express");
var db = require('../models/index')


let initRoutes = (app) => {

  app.get('/registry',
    (req, res) => {
      res.render('login/registry')
    })
  app.use('/control', controlRouter);
  app.use('/room', authenticateToken, roomRouter);
  app.use('/cart', authenticateToken, cartRouter)
  app.use('/order', authenticateToken, orderRouter)
  app.use('/information', authenticateToken, userRouter)
  app.get('/', authenticateToken, async (req, res) => {
    rooms = await db.Room.findAll()
    res.render('index', {
      rooms: rooms
    })
  })

  app.get('/login',
    (req, res) => {
      res.render('login/login', {
        data: req.query
      })
    })

}

module.exports = initRoutes