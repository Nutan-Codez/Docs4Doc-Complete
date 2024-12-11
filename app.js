var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
const passport = require('passport');
var indexRouter = require('./routes/index');
const userModel = require('./routes/models/users'); 
var usersRouter = require('./routes/users');
var doctorRoutes = require('./routes/doctor');
var app = express();




// Serve static files like images from the 'public' folder
app.use('/uploads', express.static('public/images/uploads'));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "hellobye"
}));

app.use(passport.initialize());
app.use(passport.session());
// Import the User model

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/doctor', doctorRoutes);


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
