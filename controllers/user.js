// Bcrypt and Json Web Token plugin import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Model import
const User = require('../models/User');

// Acount creation
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: 'User created !'}))
                .catch(error => res.status(400).json({error}))
            ;
        })
        .catch(error => res.status(500).json({error}))
    ;
};

// Login
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            // User check
            if(!user) {
                res.status(401).json({message: 'Login failed !'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) { return res.status(401).json({message: 'Login failed !'})}
                        // Token generation
                        else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({userId: user._id}, '/(FLf|HgIXjHH;|W>DMu', {expireIn: '24h'})
                            });
                        }
                    })
                    .catch(error => res.status(500).json({error}))
                ;
            }
        })
        .catch(error => res.status(500).json({error}))
    ;
};