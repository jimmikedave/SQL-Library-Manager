const express = require('express');
const router = express.Router();

router.get('/books', (req,res) => {

    res.render('index');
})

modules.exports = router;