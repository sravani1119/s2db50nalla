var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vehicleRouter = require('./routes/vehicle');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var vehicle = require("./models/Vehicle");
var resourceRouter = require('./routes/resource');


const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicle', vehicleRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function recreateDB(){
  // Delete everything
  await vehicle.deleteMany();
  let instance1 = new vehicle({name:"CAR", type:'ROADWAYS', noofpassangers:100});
  let instance2 = new vehicle({name:"SHIP", type:'WATERWAYS', noofpassangers:80});
  let instance3 = new vehicle({name:"ETIHAD", type:'AIRWAYS', noofpassangers:150});
 
  instance1.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("First object saved")
  });
  instance2.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("First object saved")
    });
    instance3.save( function(err,doc) {
      if(err) return console.error(err);
      console.log("First object saved")
      });
  }
  let reseed = true;
  //if (reseed) { recreateDB();}

module.exports = app;
