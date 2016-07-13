import config from './config'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import PawnService  from './services/pawnServices'
var pawnService = new PawnService();
import DepositorService from './services/depostitorServices';
var depositorService = new DepositorService();
import DayBookService from './services/dayBookServices';
var dayBookService = new DayBookService();
var mongoose = require('mongoose')

var app = express();
console.log(config.database)
mongoose.connect(config.database)
mongoose.Promise = global.Promise
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Add
app.post('/api/depositor', function(req,res,next){
    depositorService.addDepositor(req,res,next);
})

app.post('/api/pawn', function(req,res,next){
  pawnService.addPawn(req,res,next);
})

app.post('/api/daybook', function(req,res,next){
  dayBookService.addDayBook(req,res,next);
})

//Edit
app.post('/api/edit/depositor', function(req,res,next){
  dayBookService.editDepositor(req,res,next);
})

app.post('/api/edit/daybook', function(req,res,next){
  dayBookService.editDayBook(req,res,next);
})

app.post('/api/edit/pawn', function(req,res,next){
  dayBookService.editPawn(req,res,next);
})

//Get
app.get('/api/pawn', function(req,res,next){
  pawnService.getPawn(req,res,next);
})


app.get('/api/pawn/:id',function(req,res,next){
  pawnService.getPawnById(req,res,next);
})

app.get('/api/depositor/:id',function(req,res,next){
    depositorService.getDepostitorById(req,res,next);
})


//Get ALl
app.get('/api/getalldetails', function(req,res,next){
     dayBookService.getAllDetailsCombined(req,res,next);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
