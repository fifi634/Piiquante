// JSON models and File System plugin import
const Sauce = require('../models/Sauce');
const fs = require('fs');


// POST like note
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            let likedIdArray = sauce.usersLiked;
            let dislikedArray = sauce.usersDisliked;
            // Search if user is known in array's like or dislike, return a boolean
            let inArrayLike = likedIdArray.includes(req.body.userId);
            let inArrayDislike = dislikedArray.includes(req.body.userId);

            // If user like sauce, increment "likes" and add id user's in "usersLiked" array
            if (req.body.like === 1 && !inArrayLike) {
                Sauce.updateOne({_id: req.params.id}, {$push: {usersLiked: req.body.userId}, $inc: {likes: 1}} )
                    .then(() => res.status(200).json({message: 'Like updated'}))
                    .catch(error => res.status(400).json({error}))
                ;
                return;
            }

            // If user cancel his like, delete id user's in "usersLiked" array and subtrack this like
            if (req.body.like === 0) {
                // If it's a like cancel
                if (inArrayLike) {
                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
                        .then(() => res.status(200).json({message: 'Like canceled'}))
                        .catch(error => res.status(400).json({error}))
                    ;
                    return;
                }
                // If it's a dislike cancel
                if (inArrayDislike) {
                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}})
                        .then(() => res.status(200).json({message: 'Dislike canceled'}))
                        .catch(error => res.status(400).json({error}))
                    ;
                    return;
                }
            }

            // If user dislike sauce, increment "dislike" and add iduser's in usersDislike array
            if (req.body.like === -1 && !inArrayDislike) {
                Sauce.updateOne({_id: req.params.id}, {$push: {usersDisliked: req.body.userId}, $inc: {dislikes: 1}})
                    .then(() => res.status(200).json({message: 'Dislike updated'}))
                    .catch(error => res.status(400).json({error}))
                ;
            }

            // Else can't update like
            else {
                res.status(202).json({message: 'Like or dislike already stored or impossible to cancel inexisting like'});
                return;
            };
        })         
        .catch(error => res.status(500).json({error}))
    ;   
};


// POST created data
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
        .then(() => {res.status(201).json({message: 'POST successful, storage!'})})
        .catch(error => res.status(400).json({error}))
    ;
};


// PUT Modify one sauce
exports.modifySauce = (req, res, next) => {
    
    // Check if it have image modification for delete old it
    if(req.file) {
        Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                // Check user
                if(sauce.userId != req.auth.userId) {
                    res.status(403).json({message: 'Unauthorized delete request'})
                } else {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err => err ? console.log(err) : console.log('Old image deleted')));
                }})
            .catch(error => res.status(400).json({error}))
        ;
    }
    
    // Check if it have a image or not for object modification
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    delete sauceObject._userId;

    // Save modification
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            // Check user
            if(sauce.userId != req.auth.userId) {
                res.status(403).json({message: 'Unauthorized modification request'})
            } else {
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Modified !'}))
                    .catch(error => res.status(401).json({error}))
                ;
            }
        })
        .catch(error => res.status(400).json({error}))
    ;
};


// DELETE one sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
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


// GET Recover one sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
    ;
};


// GET Recover all sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({error}))
    ;
};