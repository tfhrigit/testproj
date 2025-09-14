const express = require('express');
const { protect } = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;