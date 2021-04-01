const runSql = require('../db/db');



// read
function index(req, res) {

    runSql('SELECT * FROM log_entries;', [], db => {

        res.json(log_entries)
        res.json(db.rows)
    })
} 

// create 
function create(req, res) {

    runSql(
        'INSERT INTO log_entries (content) VALUES ($1) returning * ',
        [req.body.content],
        db => {
            res.json({ 
                message: 'success', 
                log_entries: db.rows[0]
            })
        }
    )    
}


module.exports = {
    index,
    create   
}