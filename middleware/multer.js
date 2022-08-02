// Multer plugin import
const multer = require('multer');

// Extension dictionnary
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp'
};

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        // File name creation
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Multer export
module.exports = multer({storage}).single('image');