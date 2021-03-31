const { Pool } = require('pg')

let pool;
    if (process.env.PRODUCTION) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    })
    } else {
    pool = new Pool({
        database: 'onlookers_app'
    })
}

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