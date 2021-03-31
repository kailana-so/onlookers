const { Pool } = require('pg')
const pool = new Pool ({ database: 'onlookers_app' })

function create(req, res) {
    console.log( { content: req.body.content } )
    res.json({ message: 'success' })
}

module.exports = {
    create
}