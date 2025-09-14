const express = require('express');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { 
  getTracks, 
  createTrack, 
  updateTrack, 
  deleteTrack 
} = require('../controllers/trackController');

const router = express.Router();

router.route('/')
  .get(getTracks)
  .post(protect, upload.single('audio'), createTrack);

router.route('/:id')
  .put(protect, upload.single('audio'), updateTrack)
  .delete(protect, deleteTrack);

module.exports = router;