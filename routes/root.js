const express = require('express')
const router = express.Router()
const path = require ('path')

// Gets the index.html file using a regex path
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router