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

// read
function index(req, res) {

    pool.query('SELECT * FROM log_entries;', [], (err, db) => {

        res.json(log_entries)
        res.json(db.rows)
    })
} 

// create 
function create(req, res) {

    pool.query(
        'INSERT INTO log_entries (content) VALUES ($1) returning * ',
        [req.body.content],
        (err, db) => {
            res.json({ 
                message: 'success', 
                log_entries: db.rows[0]
            })
        })
}


module.exports = {
    index,
    create   
}