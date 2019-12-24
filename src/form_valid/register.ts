// register.js

import Validator from 'validator';
const Empty = require('./is_empty');

module.exports = function validateRegisterInput(data:any) {
    let errors = {username : "", email : "", password : "",passwordConf : ""};
    
    data.username = !Empty(data.username) ? data.username : '';
    data.email = !Empty(data.email) ? data.email : '';
    data.password = !Empty(data.password) ? data.password : '';
    data.passwordConf = !Empty(data.passwordConf) ? data.passwordConf : '';

    if(!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'User name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.username)) {
        errors.username = 'User name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.passwordConf, {min: 6, max: 30})) {
        errors.passwordConf = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.passwordConf)) {
        errors.passwordConf = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.passwordConf)) {
        errors.passwordConf = 'Password is required';
    }

    return {
        errors,
        isValid: Empty(errors)
    }
}