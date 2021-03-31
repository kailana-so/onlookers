const { Pool } = require('pg')
const pool = new Pool ({ database: 'onlookers_app' })

function create(req, res) {
    console.log( { content: req.body.content } )
    res.json({ message: 'success' })
}

function read(req, res) {
    res.json({ message: "to do"})
}

module.exports = {
    create,
    read
}