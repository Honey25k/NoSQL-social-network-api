// require thought and user 
const Thought = require("../models/Thought");
const User = require("../models/User");
// get all thoughts posted   
module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // get single thought by id 
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(thought)
      );
  },
  // create thought post  
  createThought(req, res) {
    Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    })
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          {
            $addToSet: { thoughts: dbThoughtData._id },
          },
          { new: true }
        )
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
  // update thought post 
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
    })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // delete thought post 
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
  // add reaction 
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // delete reaction 
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
};