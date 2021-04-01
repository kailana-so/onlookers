const bcrypt = require('bcrypt')
const runSql = require('../db/db');


function newUser(req, res) {
    res.render('register.ejs') 
}

async function createUser (req, res) {

    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        runSql('INSERT INTO users(username, email, password) VALUES($1, $2, $3)', [req.body.username, req.body.email, hashedPassword], dbres => {
        
            console.log('success');
            res.redirect('/login')
        }) 
    } catch {
        res.redirect('/register')
    }
    
}


module.exports = {
    newUser,
    createUser
}