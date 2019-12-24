
const Validator = require('validator');
const Empty = require('./is_empty');

module.exports = function validateLoginInput(data:{logemail:any,logpassword:any}) {
    var errors:any;
    var error_logpassword = "";
    var error_logemail = "";

    data.logemail = !Empty(data.logemail) ? data.logemail : '';
    data.logpassword = !Empty(data.logpassword) ? data.logpassword : '';
    

    if(!Validator.isEmail(data.logemail)) {
        error_logemail = 'Email is invalid';
    }

    if(Validator.isEmpty(data.logemail)) {
        error_logemail = 'Email is required';
    }

    if(!Validator.isLength(data.logpassword, {min: 6, max: 30})) {
        error_logpassword = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.logpassword)) {
        error_logpassword = 'Password is required';
    }

    if(error_logemail != "" ||
    error_logpassword != "")
    {
        errors = {email:error_logemail,password:error_logpassword}
    }

    return {
        errors,
        isValid: Empty(errors)
    }
}