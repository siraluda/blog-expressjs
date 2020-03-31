const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    // if passwords match. store user session and redirect to the homepage
                    req.session.userId =user._id
                    res.redirect('/')
                } else { 
                    res.redirect('/auth/login') 
                }
            })
        } else if(error === null) {
            console.log(error);
            
            const loginError = 'Please provide a valid username and password';
            req.flash('loginError',loginError);

            req.flash('data', req.body);

            return res.redirect('/auth/login') 
        }
    })
}