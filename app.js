/*
!    npm run devstart
!    localhost:3000
! on Heroku my repo is heroku-bhh
! to push code from Github to Heroku repo: git push heroku-bhh master

todo: THURSDAY - try to upload a default express-generator app. Also try to build my ap as non-0express-gen

2020-06-10T17:18:59.000000+00:00 app[api]: Build started by user strangefish2000@gmail.com
2020-06-10T17:19:18.460397+00:00 app[api]: Deploy a36e8011 by user strangefish2000@gmail.com
2020-06-10T17:19:18.460397+00:00 app[api]: Release v7 created by user strangefish2000@gmail.com
2020-06-10T17:19:19.000000+00:00 app[api]: Build succeeded
2020-06-10T17:19:19.066162+00:00 heroku[web.1]: State changed from crashed to starting
2020-06-10T17:19:22.904513+00:00 heroku[web.1]: Starting process with command `node app.js`
2020-06-10T17:19:27.546058+00:00 app[web.1]: Connected to MongoDB
? 2020-06-10T17:20:23.223493+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
2020-06-10T17:20:23.242683+00:00 heroku[web.1]: Stopping process with SIGKILL
2020-06-10T17:20:23.316997+00:00 heroku[web.1]: Process exited with status 137
2020-06-10T17:20:23.355298+00:00 heroku[web.1]: State changed from starting to crashed

?  ...see line 16: I still think this is a port issue.
?  https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port

*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Property model
const Property = require('./models/property');

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const propertiesRouter = require('./routes/properties');

// mongoose setup for production
const dev_db_url = 'mongodb+srv://paul:paul3040@cluster0-gvhli.mongodb.net/<dbname>?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URL || dev_db_url;
// mongoose connection
mongoose.connect(mongoDB, {
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

// listen on correct port for Heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// removes deprecatation warning for all findById/findOne
mongoose.set('useFindAndModify', false);

app.use(logger('dev'));

// npm body-parser not required - included by default now:
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

//todo: include commented-out routes:
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/', propertiesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler (using default express)
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
