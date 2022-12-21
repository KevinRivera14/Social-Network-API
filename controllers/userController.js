const { User, Thought } = require('../models');

const userController  = {
  // Get all userData
  getUsers(req, res) { 
    User.find()
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a userData
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userDataId }) 
      .select('-__v')
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No userData with that ID' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a userData
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a userData
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }) 
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No userData with that ID' })
          : Student.deleteMany({ _id: { $in: userData.userDatas } })
      )
      .then(() => res.json({ message: 'User and userDatas deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a userData
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No userData with this id!' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add an assignment to a userData
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate( 
      { _id: req.params.userId},
      { $addToSet: { friends: req.parms.userId } },
      {  new: true },    
    )
      .then((userData) =>
        !userData
          ? res
              .status(404)
              .json({ message: 'No userData found with that ID :(' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a userData
  removeFriend(req, res) { 
    Student.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId  } },
      { new: true }
    )
      .then((userData) =>
        !userData
          ? res
              .status(404)
              .json({ message: 'No userData found with that ID :(' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  }, 

};

module.exports = userController; 
