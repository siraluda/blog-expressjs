// import model
const BlogPost = require('../models/BlogPost');
const path = require('path')

module.exports = async (req, res) => {
    // model creates a new doc with browser data
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), 
    async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
}