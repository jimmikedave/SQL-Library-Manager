const createError = require('http-errors'); //Create HTTP errors for Express, Koa, Connect, etc. with ease
const express = require('express');
const path = require('path'); //Provides utilities for working with file and directory paths
const cookieParser = require('cookie-parser'); //Parse cookie header and populate req.cookies
const logger = require('morgan'); //HTTP logger middleware for node.js

const routes = require('./routes/index');
const bookRoute = require('./routes/books');

//Creates a server when called
const app = express();

//Sets the view engine to pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Serves our static file (CSS)
app.use(express.static(path.join(__dirname, 'public')));

//When the designated path is called the middleware function is called 
app.use('/', routes);
app.use('/books', bookRoute);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404));
  });

// error handler
app.use( (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


module.exports = app;