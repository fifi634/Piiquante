// Import plugins
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();


// Configuration of Helmet for accept upload image
app.use(helmet.frameguard({action: "SAMEORIGIN"}));



// Routes import
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


//JSON body parser reception
app.use(express.json());


// CORS header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})


// Path configuration
app.use('/api/sauces', sauceRoutes);
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
mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_RULES_CONNECT}`,
    {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connection to MongoDB successful !'))
        .catch(error => console.log('Connection to MongoDB failed > ' + error))
;