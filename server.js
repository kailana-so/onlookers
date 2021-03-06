const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const logger = require('./middlewares/logger.js');
const indexControllers = require('./controllers/indexControllers.js');
const sessionControllers = require('./controllers/sessionControllers.js');
const userControllers = require('./controllers/userControllers.js');
const log_entriesController = require('./controllers/log_entriesController.js');

const session = require('express-session')
const methodOverride = require('method-override')
const runSql = require('./db/db')



// configurations
app.set('view engine', 'ejs')
app.set('views', './views')

//middleware for sending data in json format
app.use(express.json());  

//middleware for getting data from a form
app.use(express.urlencoded({ extended: true }))


// public folders
app.use(express.static('public'))

// listening on port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// middleware for loggin in terminal 
app.use(logger);

// take the input from the form to access them inside the post request - req.body.name/email/password 
// app.use(express.urlencoded({ extended: false}))
app.use(session({
    secret: 'apple', // enable session
    resave: false, // if nothing is changed in session value, don't save anything
    saveUninitialized: false // if the session value is empty, don't save
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

// create reports
app.post('/reporting', (req, res) => {
    timeStamp = new Date();
    runSql('INSERT INTO reports(report_name, date, user_id) VALUES ($1, $2, $3) returning id', [req.body.report_name, timeStamp, req.session.userId], dbres => {
    
        res.redirect(`/reporting/${dbres.rows[0].id}`)
        
    })
})


// render the reports-template page 
app.get('/report/:id/pdf', (req, res) => {
    res.render('report-template')

})

// rendering the reporting page
app.get('/reporting/:id', (req, res) => {
    res.render('reporting', req.params)
})

// create a post
app.post('/api/reports/:id/logs', log_entriesController.create)


// read the db on the spa page
app.get('/api/reports/:id', log_entriesController.read)
