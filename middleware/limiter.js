/************************ */
/* Limit wrong connection */
/************************ */


// Import plugin
const rateLimit = require('express-rate-limit');

// Configuration of limiter
const limiter = rateLimit({
    windowsMS: 5*60*1000, // millisecondes of the window
    max: 10, // Request limit of each IP per window
    standardHeaders: true, // Return rate limit info in the "RateLimit-*" headers
    legacyHeaders: false, // Disable the "X-RateLimit-*" headers
});

// Export
module.exports = limiter;