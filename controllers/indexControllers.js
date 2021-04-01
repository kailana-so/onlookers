const bcrypt = require('bcrypt')
const runSql = require('../db/db');



function loggedIn(req) {
    if(req.session.userId) {
        return true
    } else {
        return false
    }
}


function handleIndex (req, res) {
    if(loggedIn(req)) {
        runSql('SELECT * from users where id=$1;', [req.session.userId], dbres => {
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