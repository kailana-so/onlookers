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


// 
function read(req, res) {
    // SELECT * FROM log_entries join reports ON (log_entries.report_id = reports.id) WHERE report_id = $1 order by timestamp asc;
    pool.query('SELECT * FROM log_entries join reports ON (log_entries.report_id = reports.id) WHERE report_id = $1 order by timestamp asc;', [req.params.id], (err, dbres) => {
        
        res.json(dbres.rows)
        
    }) 
}

module.exports = {
    create,
    read
}