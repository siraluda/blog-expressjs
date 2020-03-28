const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
mongoose.connect('mongodb://localhost/my_database',{ useNewUrlParser: true});

// Creating a blog post
 BlogPost.create({
    title: 'The Mythbuster\'s Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when i went on ITV Tonigh to dispense a masterclass in saving money on energy bills. Energy-saving is one of my future money topics because you get past the boring bullet-point, a whole new world of thrifty nerdery opens up.'
}, (error, blogpost) => {
    console.log(error, blogpost)
})


// QUERYING
// finding a document by title
BlogPost.find({
    title: 'The Mythbuster\'s Guide to Saving Money on Energy Bills' 
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// finding a document by a key word 'the' we use the wild card '/'
BlogPost.find({
    title: /The/ 
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// finding a document by id
const id = '5e7e479f06892e3d5e299656'

BlogPost.findById(id, (error, blogpost) => {
    console.log(error, blogpost)
})

// Updating records
const id = '5e7e479f06892e3d5e299656'

 BlogPost.findByIdAndUpdate(id, {
    title: "Updated title"
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// Deleting records
const id = '5e7e479f06892e3d5e299656'

BlogPost.findByIdAndDelete(id, (error, blogpost) => {
    console.log(error, blogpost)
})
