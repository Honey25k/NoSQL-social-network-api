const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 50, 
          
    },
    email: {
      type: string,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
      maxLength: 50,  
      
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref:'Thought', 
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
    if (this.friends.length === 1) {
      return `You have ${this.friends.length} friend`;
    } else {
      return `You have ${this.friends.length} friends`;
    }
  });
  
const User = model('user', userSchema);



module.exports = User; 