const { check, validationResult } = require("express-validator");

const adminValidate = [
    check("email").isEmail(),
    check("password").isLength({min : 4})
]
module.exports = adminValidate;