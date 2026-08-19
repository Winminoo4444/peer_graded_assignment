/**
 * Validation Middleware
 * This implements the validation requirement (5pts)
 */

const { validateUser, validatePartialUser } = require('../utils/validators');

// Middleware for full user validation (POST requests)
const validateUserData = (req, res, next) => {
  const validation = validateUser(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      error: 'Validation Error',
      details: validation.errors
    });
  }

  next();
};

// Middleware for partial validation (PUT/PATCH requests)
const validatePartialUserData = (req, res, next) => {
  const validation = validatePartialUser(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      error: 'Validation Error',
      details: validation.errors
    });
  }

  next();
};

// Middleware to check if user exists
const checkUserExists = (req, res, next) => {
  const userId = req.params.id;
  const userModel = require('../models/userModel');
  const user = userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'User not found'
    });
  }

  // Attach user to request for later use
  req.userData = user;
  next();
};

// Middleware to check for duplicate email
const checkDuplicateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  const userModel = require('../models/userModel');
  const existingUser = userModel.findByEmail(email);

  if (existingUser) {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Email already exists'
    });
  }

  next();
};

module.exports = {
  validateUserData,
  validatePartialUserData,
  checkUserExists,
  checkDuplicateEmail
};