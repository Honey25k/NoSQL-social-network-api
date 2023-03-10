const { Schema, model } = require("mongoose");

// user schema 
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,20})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  if (this.friends.length === 1) {
    return `You have ${this.friends.length} friend`;
  } else {
    return `You have ${this.friends.length} friends`;
  }
});

const User = model("user", userSchema);

module.exports = User;
