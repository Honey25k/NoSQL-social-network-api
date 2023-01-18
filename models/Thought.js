const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction') 
const dateFormat = require('../utils/dateFormat'); 
// add : require dateformat  


const thoughtSchema = new Schema(

 {
  thoughtText: {
    type: String,
    required: true, 
    minLength: 1,
    maxLength: 280,
 }, 

  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  
  },

  username: {
    type: String,
    required: true,
  }, 

  reactions: [Reaction], 
 },
{
  toJSON: {
    virtuals: true,
    getters: true,
 },
    id: false,
}

); 

thoughtSchema.path('createdAt').get(function (date) {
    return date.toLocaleString();  
}); 

const Thought = model('thought', thoughtSchema); 

module.exports = Thought; 


