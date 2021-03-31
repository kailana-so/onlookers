const bcrypt = require('bcrypt')

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

function newUser(req, res) {
    res.render('register.ejs') 
}

async function createUser (req, res) {

    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        pool.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3)', [req.body.username, req.body.email, hashedPassword], (err, dbres) => {
        
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