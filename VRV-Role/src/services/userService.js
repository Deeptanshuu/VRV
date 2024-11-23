import axios from 'axios'

// In a real application, this would come from environment variables
const API_URL = 'http://localhost:3000/api'
const IS_DEVELOPMENT = true // Using a constant instead of process.env

// For development/demo purposes
const MOCK_USERS = [
  { 
    id: 'USR001',
    name: 'John Doe',
    email: 'john@vrv.com',
    role: 'Admin',
    status: 'Active',
    department: 'IT',
    joinDate: '2023-01-15',
    lastActive: '2024-01-10T09:30:00',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    permissions: ['users.manage', 'roles.manage', 'reports.view'],
  },
  { 
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane@vrv.com',
    role: 'Manager',
    status: 'Active',
    department: 'Sales',
    joinDate: '2023-03-20',
    lastActive: '2024-01-10T10:15:00',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, USA',
    permissions: ['users.view', 'reports.view'],
  },
  { 
    id: 'USR003',
    name: 'Bob Wilson',
    email: 'bob@vrv.com',
    role: 'User',
    status: 'Inactive',
    department: 'Marketing',
    joinDate: '2023-06-10',
    lastActive: '2023-12-25T14:20:00',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, USA',
    permissions: ['reports.view'],
  },
  { 
    id: 'USR004',
    name: 'Alice Johnson',
    email: 'alice@vrv.com',
    role: 'Manager',
    status: 'Active',
    department: 'HR',
    joinDate: '2023-02-28',
    lastActive: '2024-01-09T16:45:00',
    phone: '+1 (555) 456-7890',
    location: 'Miami, USA',
    permissions: ['users.view', 'reports.view'],
  },
  { 
    id: 'USR005',
    name: 'Charlie Brown',
    email: 'charlie@vrv.com',
    role: 'User',
    status: 'Active',
    department: 'Finance',
    joinDate: '2023-08-15',
    lastActive: '2024-01-10T11:20:00',
    phone: '+1 (555) 567-8901',
    location: 'Boston, USA',
    permissions: ['reports.view'],
  },
]

class UserService {
  async getUsers() {
    try {
      return Promise.resolve(MOCK_USERS)
    } catch (error) {
      this.handleError(error)
    }
  }

  async getUserById(id) {
    try {
      const user = MOCK_USERS.find(u => u.id === id)
      return Promise.resolve(user)
    } catch (error) {
      this.handleError(error)
    }
  }

  async createUser(userData) {
    try {
      // Get the highest ID number and increment by 1
      const maxId = Math.max(...MOCK_USERS.map(u => parseInt(u.id.replace('USR', ''))))
      const nextId = maxId + 1
      // Format the ID with leading zeros
      const formattedId = `USR${String(nextId).padStart(3, '0')}`

      const newUser = {
        id: formattedId,
        ...userData,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString(),
        permissions: this.getDefaultPermissions(userData.role),
      }
      MOCK_USERS.push(newUser)
      return Promise.resolve(newUser)
    } catch (error) {
      this.handleError(error)
    }
  }

  getDefaultPermissions(role) {
    switch (role) {
      case 'Admin':
        return ['users.manage', 'roles.manage', 'reports.view', 'reports.create']
      case 'Manager':
        return ['users.view', 'reports.view', 'reports.create']
      default:
        return ['reports.view']
    }
  }

  async updateUser(id, userData) {
    try {
      if (IS_DEVELOPMENT) {
        const index = MOCK_USERS.findIndex(u => u.id === id)
        if (index !== -1) {
          MOCK_USERS[index] = { ...MOCK_USERS[index], ...userData }
          return Promise.resolve(MOCK_USERS[index])
        }
      }
      const response = await axios.put(`${API_URL}/users/${id}`, userData)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async deleteUser(id) {
    try {
      if (IS_DEVELOPMENT) {
        const index = MOCK_USERS.findIndex(u => u.id === id)
        if (index !== -1) {
          MOCK_USERS.splice(index, 1)
          return Promise.resolve({ success: true })
        }
      }
      await axios.delete(`${API_URL}/users/${id}`)
      return { success: true }
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    console.error('API Error:', error)
    throw error
  }
}

export const userService = new UserService() 