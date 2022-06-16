var userRouter = require("./user.route.js");
var roomRouter = require("./room.route.js");
const { authenticateToken } = require("../middleware/JWTAction.js");
const e = require("express");


let initRoutes = (app) => {
  app.use('/user', userRouter);
  app.use('/room', roomRouter);
  app.get('/about',
    (req, res) => {
      res.render('about')
    })
  app.get('/cart',
    (req, res) => {
      res.render('cart')
    })
  app.get('/', authenticateToken, ( req, res) => {
    if(err)
    {
      res.status(403).json(err)
    }
    else
      res.render('index')
  })

  app.get('/login',
    (req, res) => {
      res.render('login/login')
    })
}

module.exports = initRoutes