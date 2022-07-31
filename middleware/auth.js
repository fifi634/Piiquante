// JSON Web Token plugin import
const jwt = require('jsonwebtoken');

// Middleware export
module.exports = (req, res, next) => {
    try {
        // Get and decode token and id
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '/(FLf|HgIXjHH;|W>DMu');
        const userId = decodedToken.userid;
        // Send it to client
        req.auth = { userId: userId};
        next();
    } catch (error) {
        res.status(401).json({error});
    }
};