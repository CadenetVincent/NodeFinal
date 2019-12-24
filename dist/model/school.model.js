"use strict";
// school.model.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var school = new Schema({
    website_link: {
        type: String
    },
    adress: {
        type: String
    },
    description_eng: {
        type: String
    },
    school_icon: {
        type: String
    },
    mystate: {
        type: String
    },
    name_school: {
        type: String
    },
    grade: {
        type: Number
    },
    age: {
        type: Number
    },
    user_id: {
        type: String
    }
}, {
    collection: 'school'
});
module.exports = mongoose_1.default.model('school', school);
