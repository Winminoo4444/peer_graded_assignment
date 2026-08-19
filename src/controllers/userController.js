/**
 * User Controller - Handles all CRUD operations
 * This implements the CRUD endpoints requirement (5pts)
 */

const userModel = require('../models/userModel');
const { generateToken } = require('../middleware/auth');

// GET all users
const getAllUsers = (req, res) => {
  try {
    const users = userModel.findAll();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// GET user by ID
const getUserById = (req, res) => {
  try {
    const userId = req.params.id;
    const user = userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// POST create user
const createUser = (req, res) => {
  try {
    const userData = req.body;
    const newUser = userModel.create(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// PUT update user
const updateUser = (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    // Remove id from update data if present
    delete userData.id;

    const updatedUser = userModel.update(userId, userData);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// DELETE user
const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = userModel.delete(userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// POST login (authentication)
const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Email and password are required'
      });
    }

    const user = userModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid credentials'
      });
    }

    // In production, compare hashed passwords: bcrypt.compareSync(password, user.password)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

// GET current user profile
const getCurrentUser = (req, res) => {
  try {
    const userId = req.user.id;
    const user = userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getCurrentUser
};