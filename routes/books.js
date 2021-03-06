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
    res.render('books/new-book', { book: {} });
});

/* POST create book entry */
router.post('/', asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect('/books');
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("books/new-book", {book: book, errors: error.errors})
      } else {
        throw error;
      }
    }

}));

/* GET individual book to edit */
router.get("/:id", asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("books/update-book", { book: book, title: book.title }); 
    } else {
      const err = new Error();
      err.status = 404;
      err.message = "Looks like the book you requested doesn't exist."
      next(err)
    }
  }));

/* UPDATE individual book entry */
router.post('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.update(req.body);
        res.redirect("/books");
    } else {
        res.sendStatus(404);
    }
    
}));

/* DELETE individual book entry */
router.post("/:id/delete", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.redirect("/books")
    } else {
        res.sendStatus(404);
    }
}));

module.exports = router;