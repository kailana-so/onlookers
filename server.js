// load all the enviroment variables and set them inside process.env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const  express = require('express');
const app = express();
const port = 8080;
const logger = require('./middlewares/logger.js');
const appControllers = require('./controllers/appControllers.js');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []
// for connecting to the database
const { Pool } = require('pg')
const pool = new Pool({ database: 'onlookers_app'})

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
    secret: process.env.SESSION_SECRET,
    resave: false, // if nothing is changed in session value, don't save anything
    saveUnitialized: false // if the session value is empty, don't save
}))
app.use(passport.initialize()) // set the basics
app.use(passport.session())
app.use(methodOverride('_method'))

// checkAuthenticated checks if user is logged in, if no, redirect to login page
app.get('/',checkAuthenticated, (req, res) => {
    
    res.render('index', { name: req.user.name });
})

// checkNotAuthenticated => if user already logged in, dont take them to login page again. instead, redirect to home page. 
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true // display the error message
}))
    
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs') 
})

app.post('/register', checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})


app.delete('/logout', (req, res) => {
    req.logOut() // inbuilt fuction in passport - will clear the session automatically
    res.redirect('/login')
})


// to check if user is logged in?
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()

}

app.get('/reports/new', (req, res) => {
    res.render('new_report')
})

app.post('/reports', (req, res) => {
    timeStamp = new Date();
    pool.query('INSERT INTO reports(report_name, date) VALUES ($1, $2) returning *', [req.body.report_name, timeStamp], (err, res) => {
        console.log('success! data entered')
    })
})
