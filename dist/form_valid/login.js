"use strict";
var Validator = require('validator');
var Empty = require('./is_empty');
module.exports = function validateLoginInput(data) {
    var errors = { logemail: "", logpassword: "" };
    data.logemail = !Empty(data.logemail) ? data.logemail : '';
    data.logpassword = !Empty(data.logpassword) ? data.logpassword : '';
    if (!Validator.isEmail(data.logemail)) {
        errors.logemail = 'Email is invalid';
    }
    if (Validator.isEmpty(data.logemail)) {
        errors.logemail = 'Email is required';
    }
    if (!Validator.isLength(data.logpassword, { min: 6, max: 30 })) {
        errors.logpassword = 'Password must have 6 chars';
    }
    if (Validator.isEmpty(data.logpassword)) {
        errors.logpassword = 'Password is required';
    }
    return {
        errors: errors,
        isValid: Empty(errors)
    };
};
