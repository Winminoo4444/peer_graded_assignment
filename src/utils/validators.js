/**
 * Validation utilities for user data
 * This implements the validation requirement (5pts)
 */

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

const validateUser = (userData) => {
  const errors = [];

  // Check required fields
  if (!userData.username || userData.username.trim().length < 3) {
    errors.push('Username is required and must be at least 3 characters long');
  }

  if (!userData.email) {
    errors.push('Email is required');
  } else if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }

  if (!userData.password) {
    errors.push('Password is required');
  } else if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number');
  }

  if (userData.age && (userData.age < 18 || userData.age > 120)) {
    errors.push('Age must be between 18 and 120');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validatePartialUser = (userData) => {
  const errors = [];

  if (userData.username && userData.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (userData.email && !validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }

  if (userData.password && !validatePassword(userData.password)) {
    errors.push('Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number');
  }

  if (userData.age && (userData.age < 18 || userData.age > 120)) {
    errors.push('Age must be between 18 and 120');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUser,
  validatePartialUser
};