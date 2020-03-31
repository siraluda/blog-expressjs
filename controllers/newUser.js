module.exports = (req, res) => {
    var username = ""
    var password = ""
    const data = req.flash('data')[0];

    console.log(data);
    if (typeof data != 'undefined'){
        username = data.username;
        password = data.password
    }

    res.render('register', {
        // retrieving error messages from session and passing it to register.ejs
        // errors: req.session.validationErrors

        // retreiving errors from the validation error key
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}
