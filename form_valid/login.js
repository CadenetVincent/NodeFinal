
const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.logemail = !isEmpty(data.logemail) ? data.logemail : '';
    data.logpassword = !isEmpty(data.logpassword) ? data.logpassword : '';

    if(!Validator.isEmail(data.logemail)) {
        errors.logemail = 'Email is invalid';
    }

    if(Validator.isEmpty(data.logemail)) {
        errors.logemail = 'Email is required';
    }

    if(!Validator.isLength(data.logpassword, {min: 6, max: 30})) {
        errors.logpassword = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.logpassword)) {
        errors.logpassword = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}