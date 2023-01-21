const User = require("../models/User");
// GET all users
module.exports = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET single user by id  
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // POST new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Update single user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // delete a single user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }, { new: true })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // add user to friend list 
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // delete friend  
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json(err));
  },
};
