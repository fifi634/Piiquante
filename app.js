// Import DotEnv and Express
require('dotenv').config();

// Express import
const express = require('express');
const app = express();

// Routes import
// const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//JSON body reception
app.use(express.json());

// File path import
const path = require('path');

// CORS header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

// End-point configuration
// app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Application export
module.exports = app;

/************** */
/*  MONGO DB    */
/************** */

// Mongoose import
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.3phpp.mongodb.net/?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connection to MongoDB successful !'))
        .catch(error => console.log('Connection to MongoDB failed > ' + error))
;
