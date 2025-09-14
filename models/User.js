 const bcrypt = require('bcryptjs');
class User {
  constructor() {
    this.users = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        password: '$2a$10$8K1p/a0dURXAm7QiTRqNa.E3kV5T2u9q9.2F4/1FmVKvZZy31qBn2', // password: admin123
        name: 'Admin User',
        avatar: 'https://placehold.co/100x100?text=AU'
      }
    ];
  }
  async create(userData) {
    const newUser = {
      id: String(this.users.length + 1),
      ...userData,
      password: await bcrypt.hash(userData.password, 10)
    };
    this.users.push(newUser);
    return newUser;
  }
  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }
  async findById(id) {
    return this.users.find(user => user.id === id);
  }
  async update(id, updateData) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateData };
      return this.users[userIndex];
    }
    return null;
  }
}
module.exports = new User();