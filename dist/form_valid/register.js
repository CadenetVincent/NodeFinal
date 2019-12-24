"use strict";
// register.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var Empty = require('./is_empty');
module.exports = function validateRegisterInput(data) {
    var errors;
    var error_username = "";
    var error_email = "";
    var error_password = "";
    var error_passwordConf = "";
    data.username = !Empty(data.username) ? data.username : '';
    data.email = !Empty(data.email) ? data.email : '';
    data.password = !Empty(data.password) ? data.password : '';
    data.passwordConf = !Empty(data.passwordConf) ? data.passwordConf : '';
    if (!validator_1.default.isLength(data.username, { min: 2, max: 30 })) {
        error_username = 'User name must be between 2 to 30 chars';
    }
    if (validator_1.default.isEmpty(data.username)) {
        error_username = 'User name field is required';
    }
    if (!validator_1.default.isEmail(data.email)) {
        error_email = 'Email is invalid';
    }
    if (validator_1.default.isEmpty(data.email)) {
        error_email = 'Email is required';
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        error_password = 'Password must have 6 chars';
    }
    if (validator_1.default.isEmpty(data.password)) {
        error_password = 'Password is required';
    }
    if (!validator_1.default.isLength(data.passwordConf, { min: 6, max: 30 })) {
        error_passwordConf = 'Password must have 6 chars';
    }
    if (!validator_1.default.equals(data.password, data.passwordConf)) {
        error_passwordConf = 'Password and Confirm Password must match';
    }
    if (validator_1.default.isEmpty(data.passwordConf)) {
        error_passwordConf = 'Password is required';
    }
    if (error_password != "" ||
        error_passwordConf != "" ||
        error_username != "" ||
        error_email != "") {
        errors = { username: error_username, email: error_email, password: error_password, passwordConf: error_passwordConf };
    }
    return {
        errors: errors,
        isValid: Empty(errors)
    };
};
