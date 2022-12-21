const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,

} = require('../../controllers/userController.js');

// /api/courses
router.route('/').get(getUsers).post(createUser); 

// /Userurses/:courseIdUserr
  router.route('/:userId') 
  .get(getSingleUser)
  .put(updateUser) 
  .delete(deleteUser); 

  router.route('/:userId/friends/:friendId') 
  .post(addFriend)  
  .delete(removeFriend); 

module.exports = router;
