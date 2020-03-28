const mongoose = require('mongoose'); // importing mongoose
const Schema = mongoose.Schema; // instantiating schema

// defining the BlogPost schema
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        /*can declare property type with an object like this because we need a 'default' */
        type: Date,
        default: new Date()
    },
    image: String
});

// accessing the database via moongoose.model. the string argument is the collection name.
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// exporting the Model BlogPost. You can export only 1 variable
module.exports = BlogPost