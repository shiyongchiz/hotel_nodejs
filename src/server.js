var express = require("express");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var initRoutes = require('./route/web')
var {connectDB} = require("./config/connectDB")
const cors = require('cors');

var app = express();
//use cors
app.use(cors({ origin: true, credentials: true }))

// app.engine('pug', __express)
app.set('view engine', 'ejs')
  .set('views', __dirname + '/views')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser())

initRoutes(app)
app.use(express.static( __dirname + '/public/'))


connectDB()

app.listen(8080, (err) => {
  console.log("listen at port 8080");
})