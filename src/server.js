var express = require("express");
var bodyParser = require('body-parser');
var initRoutes = require('./route/web')
var connectDB = require("./config/connectDB")
const cors = require('cors');
const { createJWT, verifyToken } = require('../src/middleware/JWTAction');

var app = express();
//use cors
app.use(cors({ origin: true, credentials: true }))

// app.engine('pug', __express)
app.set('view engine', 'ejs')
  .set('views', __dirname + '/views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRoutes(app)
app.use(express.static( __dirname + '/public'))

// createJWT()
// let decoded = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2xhdWRpb24iLCJhZ2UiOjE4LCJpYXQiOjE2NTQ4NjA0NzJ9.x_KB1ohzyvJkOYD3DmlGvX7mizBdC7JyRL_aVu_Fn9c')
// console.log(decoded);

connectDB()

app.listen(8080, (err) => {
  console.log("listen at port 8080");
})