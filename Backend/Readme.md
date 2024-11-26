# Role-Based Access Control (RBAC) API

## Overview
A comprehensive Role-Based Access Control (RBAC) system built with Node.js, Express, and SQLite. The system provides authentication, authorization, and user/role management with a complete test suite.

## Features

### Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Token-based authentication
- Profile management
- Logout functionality

### Role Management
- Hierarchical role system
- Custom role creation
- Role permissions management
- Protected role operations
- Role assignment to users

### Authorization
- Role-based access control
- Permission-based actions
- Protected routes
- Admin privileges
- User access levels

## Technical Stack

- **Backend**: Node.js + Express
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Testing**: Jest + Supertest

##Screenshots 
![image](https://github.com/user-attachments/assets/f3e509ce-6cc8-4d12-b3e6-3b8fcb321e5f)
![image](https://github.com/user-attachments/assets/63fa55ee-8e97-423e-9184-56ff3a5feb45)
![image](https://github.com/user-attachments/assets/704a4705-b270-4866-b1bb-086428999876)
![image](https://github.com/user-attachments/assets/4b83dd14-14de-43c1-904e-9a30afc15aa0)


## Project Structure

```
Backend/
├── config/
│   └── database.js     # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── roleController.js   # Role management
│   └── userController.js   # User management
├── middleware/
│   └── auth.js        # Authentication middleware
├── models/
│   ├── index.js       # Model associations
│   ├── Role.js        # Role model
│   └── User.js        # User model
├── routes/
│   ├── authRoutes.js  # Authentication routes
│   ├── roleRoutes.js  # Role management routes
│   └── userRoutes.js  # User management routes
├── tests/
│   ├── auth.test.js   # Authentication tests
│   ├── roles.test.js  # Role management tests
│   ├── users.test.js  # User management tests
│   └── setup.js       # Test configuration
└── app.js             # Main application file
```

## API Endpoints

### Authentication
```
POST /api/auth/register
- Register new user
- Body: { username, email, password }
- Returns: { message: "User registered successfully" }

POST /api/auth/login
- Login user
- Body: { email, password }
- Returns: { token, user: { id, username, role } }

POST /api/auth/logout
- Logout user
- Headers: Authorization: Bearer <token>
- Returns: { message: "Logged out successfully" }

GET /api/auth/profile
- Get user profile
- Headers: Authorization: Bearer <token>
- Returns: User object (excluding password)
```

### Role Management
```
GET /api/roles
- Get all roles
- Headers: Authorization: Bearer <token>
- Returns: Array of roles

POST /api/roles
- Create new role (Admin only)
- Headers: Authorization: Bearer <token>
- Body: { name, permissions, description }
- Returns: Created role object

PUT /api/roles/:id
- Update role (Admin only)
- Headers: Authorization: Bearer <token>
- Body: { name, permissions, description }
- Returns: Updated role object

DELETE /api/roles/:id
- Delete role (Admin only)
- Headers: Authorization: Bearer <token>
- Returns: { message: "Role deleted successfully" }
```

### User Management
```
GET /api/users
- Get all users (Admin only)
- Headers: Authorization: Bearer <token>
- Returns: Array of users

PUT /api/users/:id/role
- Update user's role (Admin only)
- Headers: Authorization: Bearer <token>
- Body: { roleId }
- Returns: { message: "User role updated successfully" }
```

## Data Models

### User Model
```javascript
{
  id: Integer (Primary Key),
  username: String (Unique),
  email: String (Unique),
  password: String (Hashed),
  isActive: Boolean,
  RoleId: Integer (Foreign Key)
}
```

### Role Model
```javascript
{
  id: Integer (Primary Key),
  name: String (Unique),
  permissions: JSON Array,
  description: String
}
```

## Testing

The project includes comprehensive test suites for all functionality:

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:auth    # Authentication tests
npm run test:roles   # Role management tests
npm run test:users   # User management tests
```

### Test Coverage
- Authentication flows
- Role management operations
- User management
- Permission validation
- Error handling
- Edge cases

## Setup and Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
cp .env.example .env

# Configure variables
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

4. Run the application
```bash
# Development
npm run start

# Testing
npm test
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- Protected admin operations
- Secure password storage
- Token expiration
- Email validation

## Error Handling

The API implements comprehensive error handling:
- Input validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)
