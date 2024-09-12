const {check, validationResult } = require('express-validator');

const validateAdmin = [
    check('name').isAlpha().isLength({ min : 1}),
    check('email').isEmail(),
    check('password').isLength({ min : 4})
]

module.exports = validateAdmin;