// import model
const BlogPost = require('../models/BlogPost'); 

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}); // querying all the blogposts in the collection
    res.render('index', {
        blogposts: blogposts
    }); // index.ejs view now has access to the blogpost variable
}