const User = require('../models/User');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error){
            // using error message from the DB
            const validationErrors = Object.keys(error.errors).map(
                key => error.errors[key].message)
            
            // assiging error messages to a variable and saving it in sessions
            // req.session.validationErrors = validationErrors

            // flashing validation errors to the user instead storing it in the session
            req.flash('validationErrors', validationErrors)

            //
            req.flash('data', req.body);
            
            return res.redirect('/auth/register');
        }
        res.redirect('/');
    });
};