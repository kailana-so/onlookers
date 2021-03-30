const bcrypt = require('bcrypt')

const { Pool } = require('pg')
const pool = new Pool ({ database: 'onlookers_app' })




function newLoginForm(req, res) {
    res.render('login')
}


function login(req, res) {
    pool.query('SELECT * from users where email=$1', [req.body.email], (err, dbres) => {
        let hashedPassword = dbres.rows[0].password
        bcrypt.compare(req.body.password, hashedPassword, (err, result) => {
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