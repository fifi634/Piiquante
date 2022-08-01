// JSON models and File System plugin import
const Sauce = require('../models/Sauce');
const fs = require('fs');

// POST created data
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => {res.status(201).json({message: 'POST successful, storage!'})})
        .catch(error => res.status(400).json({error}))
    ;
};

// Modify one sauce
exports.modifySauce = (req, res, next) => {
    // Check if it have a file or not for recover object
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    delete sauceObject._userId;

    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            // Check user
            if(sauce.userId != req.auth.userId) {
                res.status(403).json({message: 'Unauthorized request'})
            } else {
                Sauce.updateOne({_id: req.params.id},
                {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Modified !'}))
                    .catch(error => res.status(401).json({error}))
                ;
            }
        })
        .catch(error => res.status(400).json({error}))
    ;
};

// Delete one sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne()
        .then(sauce => {
            // Check user
            if(sauce.userId != req.auth.userId) {
                res.status(403).json({message: 'Unauthorized request'})
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                // Erase data and files
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => {res.status(200).json({message: 'Deleted !'})})
                        .catch(error => res.status(400).json({error}))
                    ;
                })
            }
        })
        .catch(error => res.status(500).json({error}))
    ;
};

// Recover one sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
    ;
};

// Recover all sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}))
    ;
};