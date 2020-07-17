const express = require('express');
const router = express.Router();

//Renders the homepage
router.get('/books', (req,res) => {
    res.render('index');
})

module.exports = router;