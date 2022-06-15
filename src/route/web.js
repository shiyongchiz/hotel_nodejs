var userRouter = require("./user.route.js");
var roomRouter = require("./room.route.js");


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
    app.get('/',
    (req, res) => {
      res.render('index')
    })
}

module.exports = initRoutes