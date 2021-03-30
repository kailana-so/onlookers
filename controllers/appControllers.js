const bcrypt = require('bcrypt')

const { Pool } = require('pg')
const pool = new Pool ({ database: 'onlookers_app' })

function loggedIn(req) {
    if(req.session.userId) {
        return true
    } else {
        return false
    }
}



function handleIndex (req, res) {
    if(loggedIn(req)) {
        pool.query('SELECT * from users where id=$1;', [req.session.userId], (err, dbres) => {
            let username = dbres.rows[0].username
            res.render('index', { username: username });
        })
    } else {
        res.redirect('/login')
    }
}



// function register 
module.exports = {
    handleIndex
    
}