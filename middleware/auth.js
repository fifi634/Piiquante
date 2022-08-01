// JSON Web Token and DotEnv plugin import
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware export
module.exports = (req, res, next) => {
    try {
        // Get and decode token and id
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        // Send id to client
        req.auth = { userId: userId };
        next();
    } catch (error) {
        res.status(401).json({error});
    }
};