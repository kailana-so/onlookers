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

function runSql(sql, values=[], cb) {
    pool.query(sql, values, (err, dbres) => {
        cb(dbres)
    })
}

module.exports = runSql