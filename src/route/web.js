var controlRouter = require("./control.route.js");
var roomRouter = require("./room.route.js");
var cartRouter = require("./cart.route.js");
var userRouter = require("./user.route.js");
var orderRouter = require("./order.route.js");
const { authenticateToken } = require("../middleware/JWTAction.js");
const { cloudinary } = require('../utils/cloudinary/cloudinary');
const e = require("express");
var db = require('../models/index')
let initRoutes = (app) => {

  app.get('/registry',
    (req, res) => {
      res.render('login/registry')
    })
  app.get('/signup',
    (req, res) => {
      res.render('login/signup')
    })
  app.use('/control', controlRouter);
  app.use('/room', authenticateToken, roomRouter);
  app.use('/cart', authenticateToken, cartRouter)
  app.use('/order', authenticateToken, orderRouter)
  app.use('/information', authenticateToken, userRouter)
  app.get('/', authenticateToken, async (req, res) => {
    rooms = await db.Room.findAll()
    res.render('index', {
      homepage: 'homepage',
      rooms: rooms
    })
  })

  app.get('/login',
    (req, res) => {
      res.render('login/login', {
        data: req.query
      })
    })
  app.post('/api/upload', async (req, res) => {
    try {
      const fileStr = req.body.image;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'dev_setups'
      })
      console.log(uploadedResponse);
    } catch (e) {
      console.log(e);
    }
  })
  app.get('/api/upload', (req, res) => {
    res.render('api/upload')
  })
  app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
      .expression('folder:dev_setups')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute()
    const publicIds = resources.map(file => file.public_id
    )
    res.send(publicIds)
  })

  app.get('/api/image', async (req, res) => {
    var result = [];
    // const sss = await cloudinary.api.root_folders(function (error, result) { console.log(result); });
    await listResources(null, result, 0);
    console.log("============================================================", result);
  })

}
async function listResources(next_cursor, result) {
  var options = { resource_type: "image", folder: "dev_setups", max_results: 30 };
  if (next_cursor) {
    options["next_cursor"] = next_cursor;
  }
  await cloudinary.api.resources(options, async function (error, res) { //res here is result, not response
    if (error) {
      console.log(error);
    }
    var more = res.next_cursor;
    resources = res.resources;
    console.log("length is: ", resources.length);
    let j = 0;
    for (var res in resources) {
      res = resources[res];
      var resultTemp = [];
      var url = res.secure_url;
      resultTemp.push(j);
      // resultTemp.push(url);
      result.push(resultTemp);
      j += 1;
    }
    console.log(result);
    if (more) { await listResources(more, result); }
    else { console.log("done"); }
  });


}
module.exports = initRoutes