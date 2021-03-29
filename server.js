const  express = require('express');
const app = express();
const port = 8080;
const logger = require('./middlewares/logger.js');
const appControllers = require('./controllers/appControllers.js');


// configurations
app.set('view engine', 'ejs')
app.set('views', './views')


app.use(express.json());   

// listening on port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// middleware for loggin in terminal 
app.use(logger);


app.get('/', (req, res) => {
    
    res.render('index');
})
