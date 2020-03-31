const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

// developing schema and setting validation rules
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: [true, 'This user name already exists']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
});

// adding the unique validator pluging to our schema
UserSchema.plugin(uniqueValidator)

// Applying the password encryption hook. A hook is like a middleware which allows us to change data before saving it into a db
UserSchema.pre('save', function (next) {
    const user = this; // this makes the userSchema object available.

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;