# User Management API

A complete REST API for user management with CRUD operations, validation, logging middleware, and authentication.

## Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Data Validation** - Email, password, and field validation
- ✅ **Logging Middleware** - Request/response logging
- ✅ **Authentication** - JWT-based authentication
- ✅ **Authorization** - Role-based access control (admin/user)
- ✅ **Security** - Helmet, CORS, and environment variables

## Technology Stack

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- UUID for ID generation
- dotenv for environment variables

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/user-management-api.git

# Navigate to project directory
cd user-management-api

# Install dependencies
npm install

# Create .env file with your configuration
cp .env.example .env

# Start the server
npm start

# Or for development with auto-reload
npm run dev