/**
 * User Routes - Defines all API endpoints
 * This implements the CRUD endpoints requirement (5pts)
 */

const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getCurrentUser
} = require('../controllers/userController');

const {
  validateUserData,
  validatePartialUserData,
  checkUserExists,
  checkDuplicateEmail
} = require('../middleware/validation');

const {
  authenticate,
  authorize
} = require('../middleware/auth');

// Public routes
router.post('/login', loginUser);

// Protected routes (require authentication)
router.use(authenticate);

// GET all users (only admins can see all users)
router.get('/', authorize('admin'), getAllUsers);

// GET current user profile
router.get('/me', getCurrentUser);

// GET user by ID
router.get('/:id', checkUserExists, getUserById);

// POST create user (admin only, or self-registration for regular users)
router.post(
  '/',
  authorize('admin'),
  validateUserData,
  checkDuplicateEmail,
  createUser
);

// PUT update user
router.put(
  '/:id',
  checkUserExists,
  validatePartialUserData,
  updateUser
);

// DELETE user (admin only)
router.delete(
  '/:id',
  authorize('admin'),
  checkUserExists,
  deleteUser
);

module.exports = router;