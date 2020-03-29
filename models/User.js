const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// developing schema and setting validation rules
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

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