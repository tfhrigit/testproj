 const Track = require('../models/Track');
const User = require('../models/User');

const getTracks = async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTrack = async (req, res) => {
  const { title, artist, url, location } = req.body;

  try {
    const track = await Track.create({
      userId: req.user.id,
      title,
      artist,
      url: req.file ? `/uploads/${req.file.filename}` : url,
      location: JSON.parse(location)
    });

    res.status(201).json(track);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTrack = async (req, res) => {
  const { title, artist, url, location } = req.body;

  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    if (track.userId !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTrack = await Track.update(req.params.id, {
      title: title || track.title,
      artist: artist || track.artist,
      url: req.file ? `/uploads/${req.file.filename}` : (url || track.url),
      location: location ? JSON.parse(location) : track.location
    });

    res.json(updatedTrack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    if (track.userId !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Track.delete(req.params.id);
    res.json({ message: 'Track removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTracks, createTrack, updateTrack, deleteTrack };