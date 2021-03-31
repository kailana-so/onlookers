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
    pool.query('INSERT INTO log_entries(report_id, content) VALUES($1, $2)', [req.params.id, req.body.content], (err, dbres) => {
         
            res.json({ message: 'success' })
        
        })
    console.log( { content: req.params.id } )
}


// I dont think we need this read function to retrieve the db on the app.js
function read(req, res) {
    // const sqlParams = [req.params.id]
    // pool.query('SELECT * FROM log_entries;', [], (err, dbres) => {
        
    //     res.json(dbres.rows)
        
    // }) 
}

module.exports = {
    create,
    read
}