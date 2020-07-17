//Express module is required
const express = require('express');
const path = require('path');

//Creates a server when called
const app = express();

//Sets the view engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Serves our static file (CSS)
// app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, 'views')));

//Each module is required
const routes = require('./routes');
const bookRoutes = require('./routes/books');

//When the designated path is called the middleware function is called 
app.use(routes);
app.use(bookRoutes);

//Listens for the port 3001 to be called 
app.listen(3001, () => {
    console.log('The application is running on localhost: 3001!')
});

module.exports = app;