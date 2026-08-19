/**
 * Main Application Entry Point
 * Complete User Management API with CRUD, Validation, and Middleware
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./routes/userRoutes');
const { logger, detailedLogger } = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (implements middleware requirement)
app.use(logger);

// Development detailed logging (optional)
if (process.env.NODE_ENV === 'development') {
  app.use(detailedLogger);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 User Management API running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   POST   /api/users/login      - Login (public)`);
  console.log(`   GET    /api/users            - Get all users (admin only)`);
  console.log(`   GET    /api/users/me         - Get current user`);
  console.log(`   GET    /api/users/:id        - Get user by ID`);
  console.log(`   POST   /api/users            - Create user (admin only)`);
  console.log(`   PUT    /api/users/:id        - Update user`);
  console.log(`   DELETE /api/users/:id        - Delete user (admin only)`);
  console.log(`   GET    /health               - Health check`);
});

module.exports = app;