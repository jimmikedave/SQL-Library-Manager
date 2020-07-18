//Express module is required
const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bookRoute = require('./routes/books');

//Creates a server when called
const app = express();

//Sets the view engine to pug
app.set('view engine', 'pug');

//Serves our static file (CSS)
app.use(express.static(path.join(__dirname, 'public')));

//When the designated path is called the middleware function is called 
app.use('/', routes);
app.use('/books', bookRoute);

//Listens for the port 3001 to be called 
app.listen(3001, () => {
    console.log('The application is running on localhost: 3001!')
});

module.exports = app;