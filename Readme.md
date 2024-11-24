# VRV Security - Role Management System

### Project Overview

A comprehensive Role-Based Access Control (RBAC) system built with React, TailwindCSS and Chakra UI, designed to manage organizational hierarchies, user roles, and departmental structures. The system provides a intuitive interface for managing employee access and organizational resources.


### Screenshots
![image](https://github.com/user-attachments/assets/717cd7d2-9aac-4d50-be83-1ecdd2b72948)
![image](https://github.com/user-attachments/assets/ac87dfb6-8ed3-4fbe-adbf-62ab87474fc4)
![image](https://github.com/user-attachments/assets/0d88432b-6436-4c94-93bc-6c1e3f58ac89)
![image](https://github.com/user-attachments/assets/b5ef9443-ee19-4f6b-9f12-666adc477033)
![image](https://github.com/user-attachments/assets/439aaa82-7c66-434a-bdd7-8c0b1a5818c4)


### Tech Stack
- **Frontend Framework**: React.js with Vite
- **UI Components**: Chakra UI
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: npm
- Made in like 8 hours please have mercy


## Run Locally

Clone the project

```bash
  git clone https://github.com/Deeptanshuu/VRV/
```

Go to the project directory

```bash
  cd Frontend
```

Install dependencies

```bash
  npm install
```

Start the frontend

```bash
  npm run dev
```
## Demo Credentials
Admin

admin@vrv.com 
admin123

Manager

manager@vrv.com 
manager123

Employee

employee@vrv.com 
employee123

### Key Features

## 1. User Management
- Create, read, update, and delete users
- Role assignment and department allocation
- Advanced filtering and search capabilities
- Status management (Active/Inactive)
- Responsive design for mobile and desktop

## 2. Role Management
- Role creation and modification
- Permission assignment
- Hierarchical role structure
- Permission-based access control

## 3. Department Management
- Department creation and modification
- Budget tracking
- Employee allocation
- Department head assignment
- Location-based organization

## 4. Dashboard & Analytics
- Interactive analytics dashboard
- User activity tracking
- Department overview
- Budget utilization charts
- Recent activity logs


## 5. Dynamic Permissions
- Implemented a method to assign or modify permissions for roles.
- Displayed permissions clearly for ease of understanding and modification.

## 6. Custom API Simulation
- Mock API calls for CRUD operations on auth, users and roles.
- Mock Server responses to validate functionality ie user login etc.



## System Architecture


1. **Authentication Flow**
```javascript
// Protection of routes
ProtectedRoute → authService.isAuthenticated() → Route Access/Redirect

// Role-based access
RoleRoute → authService.hasRole() → Authorized Access/Redirect
```

2. **Service Layer Pattern**
```javascript
// Example: User Service Pattern
class UserService {
    async getUsers()      // Read operation
    async createUser()    // Create operation
    async updateUser()    // Update operation
    async deleteUser()    // Delete operation
    handleError()        // Error handling
}
```

3. **Component Communication**
```
Parent Component
    ↓ (Props)
Child Component
    ↓ (Events)
Service Layer
    ↓ (Data)
State Management
```

## Security Architecture

```
├── Authentication
│   ├── JWT Token Management (Simulated)
│   ├── Role Verification
│   └── Session Handling
├── Authorization
│   ├── Role-Based Access Control
│   ├── Permission Management
│   └── Route Protection
└── Data Security
    ├── Input Validation
    ├── Error Handling
    └── Secure Storage
```

## UI Architecture

```
Layout (Layout.jsx)
├── Header (Header.jsx)
├── Sidebar (Sidebar.jsx)
└── Main Content
    ├── Page Components
    │   ├── Forms
    │   ├── Tables
    │   └── Charts
    └── Common Components
        ├── Modals
        ├── Cards
        └── Alerts
```

## State Management Flow

```
Component State
    ↓
Service Layer
    ↓
Mock API/Data
    ↓
State Update
    ↓
UI Re-render
```

## Component Structure 

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleRoute.jsx
│   ├── common/          # Shared components
│   │   └── Modal.jsx
│   ├── departments/     # Department management
│   │   └── DepartmentForm.jsx
│   ├── layout/          # Layout components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   └── PageHeader.jsx
│   ├── roles/          # Role management
│   │   ├── RoleForm.jsx
│   │   └── RolePermissions.jsx
│   └── users/          # User management
│       └── UserForm.jsx
├── pages/              # Page components
│   ├── Analytics.jsx
│   ├── Calendar.jsx
│   ├── Dashboard.jsx
│   ├── Departments.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── Roles.jsx
│   └── Users.jsx
├── services/           # Business logic & API calls
│   ├── authService.js
│   ├── departmentService.js
│   ├── roleService.js
│   └── userService.js
└── utils/             # Utility functions
```
