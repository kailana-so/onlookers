const bcrypt = require('bcrypt')
const runSql = require('../db/db');




function newLoginForm(req, res) {
    res.render('login')
}


function login(req, res) {
    // runSql('SELECT * from users where email=$1', [req.body.email], dbres => {
    runSql('SELECT * from users where email=$1', ['test'], dbres => {
        let hashedPassword = dbres.rows[0].password
        // bcrypt.compare(req.body.password, hashedPassword, (err, result) => {
        bcrypt.compare('test', hashedPassword, (err, result) => {

            if(result == true) {
                let user_id = dbres.rows[0].id
                console.log(user_id)
                req.session.userId = user_id
                res.redirect('/')
            } else {
                res.redirect('/login')
            }
        })
    })

}

function logout(req, res) {

    req.session.userId = null
    res.redirect('/login')
}

module.exports = {
    login,
    logout, 
    newLoginForm
    
}