/*
!    npm run devstart
!    localhost:3000
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Property model
let Property = require('./models/property');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//mongoose setup
mongoose.connect('mongodb://localhost:27017/bhh', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
// Check connection
db.once('open', function () {
  console.log('Connected to MongoDB');
});
// Check for db errors
db.on('error', function (err) {
  console.error(err);
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// removes deprecatation warning for all findById/findOne
mongoose.set('useFindAndModify', false);

app.use(logger('dev'));

// body-parser not required - included by default now:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//! IMPORTANT
//* I couldn't get custom css or assets (images) to
//* ...load without adding this:
//* SEE: https://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
//* SEE: https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/assets', express.static('public/assets'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
