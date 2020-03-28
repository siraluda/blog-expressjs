/***********APPLICATION REQUIREMENTS******************************** */
// importing requirements
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // this parse's incoming request bodies in a middleware and make the form data available under 'req.body' property 
const fileUpload = require('express-fileupload');

/***********IMPORTING CONTROLLERS******************************** */
const newPostController = require('./controllers/newPost');
const homePageController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost')

/***********INITIALIZATIONS******************************** */
// initializing the server appplication
const app = express();

// connecting to mongodb using mongoose. mongoose is a library that allows node js applications to talk to mongodb
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

/***********MIDDLEWARES******************************** */
// serving static files using express.static (middleware)
app.use(express.static('public'));

// parsing request body using bodyParser (middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// adding the 'files' property to the req object so that we can access the uploaded files using req.files
app.use('/post/store', fileUpload())

// informin express to use the ejs template engine and that
// any file ending in .ejs should rendered with the EJS package
app.set('view engine', 'ejs')

// custom middleware
const validateMiddleWare = require('./middleware/validationMiddleware')
app.use('/post/store',validateMiddleWare); // applying a middleware for a specific url request

//***********CONTROLLERS & ROUTING******************************** */
// Creating routes and rendering ejs templates as response 
app.get('/', homePageController);

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/search', (req, res) => {
    res.render('search');
})

app.get('/post/new', newPostController)

app.post('/post/store', storePostController)

app.get('/post/:id', getPostController)


//***********SERVER*********************************/
// app server listening
app.listen(4000, () => {
    console.log("App listening on port 4000")
});