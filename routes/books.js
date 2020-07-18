const express = require('express');
const book = require('../models/book');
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
router.get('/', asyncHandler(async (req,res) => {
    const books = await Book.findAll();
    console.log(books);
    res.render('books/index', {books: books});
}));

/* Create a new book entry */
router.get('/new', (req,res) => {
    res.render('books/new');
})

module.exports = router;