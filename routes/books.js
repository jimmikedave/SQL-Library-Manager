const express = require('express');
const router = express.Router();

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
  

//Renders the homepage
router.get('/', asyncHandler(async (req,res) => {
    res.render('index');
}));

//Create a new book entry
router.get('/new', (req,res) => {
    res.render('books/new');
})

module.exports = router;