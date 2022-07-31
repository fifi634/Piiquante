// Mongoose import
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//ID users schema
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Apply validator to model
userSchema.plugin(uniqueValidator);

// Model export
module.exports = mongoose.model('User', userSchema);