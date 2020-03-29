/***********APPLICATION REQUIREMENTS******************************** */
// importing requirements
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // this parse's incoming request bodies in a middleware and make the form data available under 'req.body' property 
const fileUpload = require('express-fileupload');
const expressSession = require('express-session') // a middleware used to keep a logged in user's information in their browser

/***********IMPORTING CONTROLLERS******************************** */
const newPostController = require('./controllers/newPost');
const homePageController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser'); 
const loginPageController = require('./controllers/login');
const loginUserController = require('./controllers/userLogin');
const logoutController = require('./controllers/logout');

/***********INITIALIZATIONS******************************** */
// initializing the server appplication
const app = express();

// connecting to mongodb using mongoose. mongoose is a library that allows node js applications to talk to mongodb
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

/***********MIDDLEWARES******************************** */
// serving static files using express.static (middleware)
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// adding the 'files' property to the req object so that we can access the uploaded files using req.files
app.use('/post/store', fileUpload())

// informing express to use the ejs template engine and that
// any file ending in .ejs should rendered with the EJS package
app.set('view engine', 'ejs')

// setting a secret key with express session middleware. the secret key is used to sign and encrypt the session ID
app.use(expressSession({
    secret: 'keyboard cat'
}))

/**Custom Middlewares */
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const validateMiddleWare = require('./middleware/validationMiddleware');

app.use('/post/store',validateMiddleWare); // applying a middleware for a specific url request

// conditional global variable
global.loggedIn = null;
app.use('*', (req,res, next) => {
    loggedIn = req.session.userId;
    next();
})


//***********CONTROLLERS & ROUTING******************************** */
// Creating routes and rendering ejs templates as response 
app.get('/', homePageController);

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/auth/logout', logoutController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware,loginPageController);

app.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware,newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware,storeUserController);

app.get('/post/new', authMiddleware, newPostController); // protecting routes with authMiddleware

app.post('/post/store', authMiddleware,storePostController);

app.get('/post/:id', getPostController);

app.use((req, res) => res.render('notfound')); // this is a middleware-like route. express will go through all the routes and if it cant's find
// any matches with the requested url it will render notfound.ejs page.


//***********SERVER*********************************/
// app server listening
app.listen(4000, () => {
    console.log("App listening on port 4000")
});