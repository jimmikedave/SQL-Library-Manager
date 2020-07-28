const express = require('express');
const path = require('path'); //Provides utilities for working with file and directory paths


const routes = require('./routes/index');
const bookRoute = require('./routes/books');

//Creates a server when called
const app = express();

//Sets the view engine to pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Serves our static file (CSS)
app.use(express.static(path.join(__dirname, 'public')));

//When the designated path is called the middleware function is called 
app.use('/', routes);
app.use('/books', bookRoute);

/* ERROR HANDLERS */

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    res.status(404).render('books/not-found');
  });

// global error handler
app.use( (err, req, res, next) => {

  if (err.status === 404) {
    res.status(404).render('books/not-found', {err});
  } else {
    err.message = err.message || 'Oops It looks like something went wrong on the server.';
    res.status(err.status || 500).render('books/error', {err});
  }

});


module.exports = app;