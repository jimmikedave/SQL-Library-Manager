const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        res.status(500).send(error);
      }
    }
  }
  

/* Renders the homepage */
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render('books/index', {books});
}));

/* Create a new book entry */
router.get('/new', (req,res) => {
    res.render('books/new', { book: {} });
});


/* POST create book entry */
router.post('/', asyncHandler(async (req, res) => {
    // const book = await Book.create(req.body);
    console.log(req.body);
    res.redirect('/books/');
}));

module.exports = router;