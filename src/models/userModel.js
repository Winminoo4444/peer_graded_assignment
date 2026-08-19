/**
 * In-memory user storage (simulates database)
 * For production, replace with actual database (MongoDB, PostgreSQL, etc.)
 */

const { v4: uuidv4 } = require('uuid');

// In-memory database
let users = [];

// Sample users for testing
const initializeUsers = () => {
  users = [
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      password: 'Password123',
      age: 30,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'SecurePass456',
      age: 25,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

initializeUsers();

// Model operations
const userModel = {
  // GET all users
  findAll: () => {
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  },

  // GET user by ID
  findById: (id) => {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // GET user by email (for authentication)
  findByEmail: (email) => {
    return users.find(u => u.email === email);
  },

  // POST create user
  create: (userData) => {
    const newUser = {
      id: uuidv4(),
      ...userData,
      password: userData.password, // In production, hash this: bcrypt.hashSync(userData.password, 10)
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // PUT update user
  update: (id, userData) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    const updatedUser = {
      ...users[index],
      ...userData,
      id: users[index].id, // Prevent ID changes
      createdAt: users[index].createdAt, // Keep original creation date
      updatedAt: new Date().toISOString()
    };
    users[index] = updatedUser;
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  // DELETE user
  delete: (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },

  // Helper to reset database (for testing)
  reset: () => {
    initializeUsers();
  }
};

module.exports = userModel;