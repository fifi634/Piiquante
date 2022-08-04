// Mongoose import
const mongoose = require('mongoose');

// Schema creation
const likeSchema = mongoose.Schema({
    userId: {type: String, require: true},
    like: {type: Number, required: true}
});

// Schema export
module.exports = mongoose.model('Like', likeSchema)