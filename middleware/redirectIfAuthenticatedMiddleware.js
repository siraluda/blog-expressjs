module.exports = (req, res, next) => {
    if (req.session.userId){
        // if user is logged in redirect to homepage
        return res.redirect('/')
    }
    next();
}