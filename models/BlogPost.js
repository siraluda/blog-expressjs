const mongoose = require('mongoose'); // importing mongoose
const Schema = mongoose.Schema; // instantiating schema
var uniqueValidator = require('mongoose-unique-validator');

// defining the BlogPost schema
const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    body: {
        type:String,
        required: [true, 'Please add some text']
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        /*can declare property type with an object like this because we need a 'default' */
        type: Date,
        default: new Date()
    },
    image: String
});

BlogPostSchema.plugin(uniqueValidator)

// accessing the database via moongoose.model. the string argument is the collection name.
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// exporting the Model BlogPost. You can export only 1 variable
module.exports = BlogPost;