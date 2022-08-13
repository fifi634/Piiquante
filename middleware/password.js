/********************* */
/* Set format password */
/********************* */

// Import plugin
const passwordValidator = require('password-validator');

// Schema of password
let passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)    // Minimum length
    .is().max(100)  // Maximum length
    .has().uppercase()  // Must have uppercase letters
    .has().lowercase()  // Must have lowercase letters
    .has().digits(2)    // Number of digit must have
    .has().not().spaces()   // No spaces
    .is().not().oneOf(['Passw0rd', 'Password123'])  // Blacklist


// Check quality of password and export it
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) { next(); }
    else { 
        return res
            .status(400)
            .json({error: `Your password must have 8 characters with 2 digits. Space is not authorize. This is problematic in your password : ${(passwordSchema.validate(req.body.password, {list: true}))}`})
        ;
    };
};