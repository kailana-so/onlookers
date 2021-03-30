const  express = require('express');
const app = express();
const port = 8080;
const logger = require('./middlewares/logger.js');
const appControllers = require('./controllers/appControllers.js');

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


app.get('/', (req, res) => {
    
    res.render('index');
})

app.get('/reports/new', (req, res) => {
    res.render('new_report')
})

app.post('/reports', (req, res) => {
    timeStamp = new Date();
    pool.query('INSERT INTO reports(report_name, date) VALUES ($1, $2) returning *', [req.body.report_name, timeStamp], (err, res) => {
        console.log('success! data entered')
    })
})