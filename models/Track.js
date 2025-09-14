 class Track {
  constructor() {
    this.tracks = [
      {
        id: '1',
        userId: '1',
        title: 'Sample Track',
        artist: 'Sample Artist',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        location: { lat: -6.2088, lng: 106.8456 }, // Jakarta
        createdAt: new Date().toISOString()
      }
    ];
  }
  async create(trackData) {
    const newTrack = {
      id: String(this.tracks.length + 1),
      ...trackData,
      createdAt: new Date().toISOString()
    };
    this.tracks.push(newTrack);
    return newTrack;
  }
  async findAll() {
    return this.tracks;
  }
  async findByUserId(userId) {
    return this.tracks.filter(track => track.userId === userId);
  }
  async findById(id) {
    return this.tracks.find(track => track.id === id);
  }
  async update(id, updateData) {
    const trackIndex = this.tracks.findIndex(track => track.id === id);
    if (trackIndex !== -1) {
      this.tracks[trackIndex] = { ...this.tracks[trackIndex], ...updateData };
      return this.tracks[trackIndex];
    }
    return null;
  }
  async delete(id) {
    const trackIndex = this.tracks.findIndex(track => track.id === id);
    if (trackIndex !== -1) {
      const deletedTrack = this.tracks[trackIndex];
      this.tracks.splice(trackIndex, 1);
      return deletedTrack;
    }
    return null;
  }
}
module.exports = new Track();