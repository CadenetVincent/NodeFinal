// school.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let school = new Schema({
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
  grade :{
    type: Number
  },
  age :{
    type:Number
  },
  user_id:{
    type: String
  }
},{
  collection: 'school'
});

module.exports = mongoose.model('school', school);