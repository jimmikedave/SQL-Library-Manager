//Express module is required
const express = require('express');

//Creates a server when called
const app = express();

//Sets the view engine to pug
app.set('view engine', 'pug');

//Serves our static files such as images, CSS, and JS files**
app.use('/static', express.static('public'))

//Each module is required
const routes = require('./routes');
const bookRoutes = require('./routes/books');

//When the designated path is called the middleware function is called 
app.use(routes);
app.use('/books', bookRoutes)



//Listens for the port 3001 to be called 
app.listen(3001, () => {
    console.log('The application is running on localhost: 3001!')
});