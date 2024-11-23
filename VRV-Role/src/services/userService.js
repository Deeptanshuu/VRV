import axios from 'axios'

// In a real application, this would come from environment variables
const API_URL = 'http://localhost:3000/api'
const IS_DEVELOPMENT = true

// For development/demo purposes with Indian context
const MOCK_USERS = [
  { 
    id: 'USR001',
    name: 'Rajesh Kumar',
    email: 'rajesh@vrv.com',
    role: 'Admin',
    status: 'Active',
    department: 'IT',
    joinDate: '2023-01-15',
    lastActive: '2024-01-10T09:30:00',
    phone: '9876543210',
    location: 'Bangalore, India',
  },
  { 
    id: 'USR002',
    name: 'Priya Sharma',
    email: 'priya@vrv.com',
    role: 'Manager',
    status: 'Active',
    department: 'Sales',
    joinDate: '2023-03-20',
    lastActive: '2024-01-10T10:15:00',
    phone: '9876543211',
    location: 'Mumbai, India',
  },
  {
    id: 'USR003',
    name: 'Amit Patel',
    email: 'amit@vrv.com',
    role: 'Manager',
    status: 'Active',
    department: 'HR',
    joinDate: '2023-02-15',
    lastActive: '2024-01-09T14:20:00',
    phone: '9876543212',
    location: 'Delhi, India',
  },
  {
    id: 'USR004',
    name: 'Deepika Singh',
    email: 'deepika@vrv.com',
    role: 'Manager',
    status: 'Active',
    department: 'Marketing',
    joinDate: '2023-04-10',
    lastActive: '2024-01-08T11:45:00',
    phone: '9876543213',
    location: 'Hyderabad, India',
  },
  {
    id: 'USR005',
    name: 'Arjun Reddy',
    email: 'arjun@vrv.com',
    role: 'Employee',
    status: 'Active',
    department: 'IT',
    joinDate: '2023-05-01',
    lastActive: '2024-01-07T16:30:00',
    phone: '9876543214',
    location: 'Chennai, India',
  },
  {
    id: 'USR006',
    name: 'Neha Gupta',
    email: 'neha@vrv.com',
    role: 'Employee',
    status: 'Active',
    department: 'Sales',
    joinDate: '2023-06-15',
    lastActive: '2024-01-06T13:15:00',
    phone: '9876543215',
    location: 'Pune, India',
  },
  {
    id: 'USR007',
    name: 'Vikram Malhotra',
    email: 'vikram@vrv.com',
    role: 'Manager',
    status: 'Active',
    department: 'Finance',
    joinDate: '2023-07-01',
    lastActive: '2024-01-05T10:45:00',
    phone: '9876543216',
    location: 'Kolkata, India',
  },
  {
    id: 'USR008',
    name: 'Ananya Desai',
    email: 'ananya@vrv.com',
    role: 'Employee',
    status: 'Active',
    department: 'HR',
    joinDate: '2023-08-20',
    lastActive: '2024-01-04T15:20:00',
    phone: '9876543217',
    location: 'Ahmedabad, India',
  },
  {
    id: 'USR009',
    name: 'Karthik Iyer',
    email: 'karthik@vrv.com',
    role: 'Employee',
    status: 'Active',
    department: 'Marketing',
    joinDate: '2023-09-10',
    lastActive: '2024-01-03T09:30:00',
    phone: '9876543218',
    location: 'Noida, India',
  },
  {
    id: 'USR010',
    name: 'Meera Verma',
    email: 'meera@vrv.com',
    role: 'Manager',
    status: 'Active',
    department: 'Operations',
    joinDate: '2023-10-05',
    lastActive: '2024-01-02T14:45:00',
    phone: '9876543219',
    location: 'Gurgaon, India',
  }
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