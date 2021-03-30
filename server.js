// load all the enviroment variables and set them inside process.env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = 8080;
const logger = require('./middlewares/logger.js');
const appControllers = require('./controllers/appControllers.js');
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const { Pool } = require('pg')
const pool = new Pool ({ database: 'onlookers_app' })



// configurations
app.set('view engine', 'ejs')
app.set('views', './views')

//middleware for sending data in json format
app.use(express.json());  

//middleware for getting data from a form
app.use(express.urlencoded())

// listening on port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// middleware for loggin in terminal 
app.use(logger);

// take the input from the form to access them inside the post request - req.body.name/email/password 
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, // enable session
    resave: false, // if nothing is changed in session value, don't save anything
    saveUnitialized: false // if the session value is empty, don't save
}))

app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    pool.query('SELECT * from users where id=$1;', [session.id], (err, dbres) => {
        let username = dbres.rows[0].username
        res.render('index', { username: username });
    })
})



app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    pool.query('SELECT * from users where email=$1', [req.body.email], (err, dbres) => {
        let hashedPassword = dbres.rows[0].password
        bcrypt.compare(req.body.password, hashedPassword, (err, result) => {
            if(result == true) {
                let user_id = dbres.rows[0].id
                console.log(user_id)
                session.id = user_id
                res.redirect('/')
            } else {
                res.redirect('/login')
            }
        })
    })

})
    
app.get('/register', (req, res) => {
    res.render('register.ejs') 
})

app.post('/register', async (req, res) => {

    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        pool.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3)', [req.body.username, req.body.email, hashedPassword], (err, dbres) => {
        
            console.log('success');
            res.redirect('/login')
        }) 
    } catch {
        res.redirect('/register')
    }
    
})




// app.delete('/logout', (req, res) => {
//     req.logOut() // inbuilt fuction in passport - will clear the session automatically
//     res.redirect('/login')
// })



app.get('/reports/new', (req, res) => {
    res.render('new_report')
})

app.post('/reports', (req, res) => {
    timeStamp = new Date();
    pool.query('INSERT INTO reports(report_name, date) VALUES ($1, $2) returning *', [req.body.report_name, timeStamp], (err, res) => {
        console.log('success! data entered')
    })
})
