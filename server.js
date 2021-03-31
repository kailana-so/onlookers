const express = require('express');
const app = express();
const port = 8080;
const logger = require('./middlewares/logger.js');
const indexControllers = require('./controllers/indexControllers.js');
const sessionControllers = require('./controllers/sessionControllers.js');
const userControllers = require('./controllers/userControllers.js');
const log_entriesController = require('./controllers/log_entriesController');
const session = require('express-session')
const methodOverride = require('method-override')

const { Pool } = require('pg')
const pool = new Pool ({ database: 'onlookers_app' })




// configurations
app.set('view engine', 'ejs')
app.set('views', './views')
app.set

//middleware for sending data in json format
app.use(express.json());  

//middleware for getting data from a form
app.use(express.urlencoded())


// public folders
app.use(express.static('public'))

// listening on port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// middleware for loggin in terminal 
app.use(logger);

// take the input from the form to access them inside the post request - req.body.name/email/password 
app.use(express.urlencoded({ extended: false}))
app.use(session({
    secret: 'apple', // enable session
    resave: false, // if nothing is changed in session value, don't save anything
    saveUnitialized: false // if the session value is empty, don't save
}))

app.use(methodOverride('_method'))


app.get('/', indexControllers.handleIndex)

app.get('/login', sessionControllers.newLoginForm)

app.post('/sessions', sessionControllers.login)
    
app.get('/register', userControllers.newUser)

app.post('/register', userControllers.createUser)

app.delete('/sessions', sessionControllers.logout)

app.get('/reports/new', (req, res) => {
    res.render('new_report')
})

app.post('/reports', (req, res) => {
    timeStamp = new Date();
    pool.query('INSERT INTO reports(report_name, date) VALUES ($1, $2) returning *', [req.body.report_name, timeStamp], (err, res) => {
        console.log('success! data entered')
    })
})


// create reports
app.get('/reporting', (req, res) => {
    res.render('reporting')
})

app.post('/api/logs', log_entriesController.create)