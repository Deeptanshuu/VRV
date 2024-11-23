import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const MOCK_ROLES = [
  {
    id: 1,
    name: 'Admin',
    description: 'Full system access',
    permissions: ['users.manage', 'roles.manage', 'reports.view'],
    status: 'Active'
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Team management access',
    permissions: ['users.view', 'reports.view', 'reports.create'],
    status: 'Active'
  },
  {
    id: 3,
    name: 'User',
    description: 'Basic access',
    permissions: ['reports.view'],
    status: 'Active'
  }
]

class RoleService {
  async getRoles() {
    try {
      return Promise.resolve(MOCK_ROLES)
    } catch (error) {
      this.handleError(error)
    }
  }

  async getRoleById(id) {
    try {
      const role = MOCK_ROLES.find(r => r.id === id)
      return Promise.resolve(role)
    } catch (error) {
      this.handleError(error)
    }
  }

  async createRole(roleData) {
    try {
      const newRole = {
        id: MOCK_ROLES.length + 1,
        ...roleData
      }
      MOCK_ROLES.push(newRole)
      return Promise.resolve(newRole)
    } catch (error) {
      this.handleError(error)
    }
  }

  async updateRole(id, roleData) {
    try {
      const index = MOCK_ROLES.findIndex(r => r.id === id)
      if (index !== -1) {
        MOCK_ROLES[index] = { ...MOCK_ROLES[index], ...roleData }
        return Promise.resolve(MOCK_ROLES[index])
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  async deleteRole(id) {
    try {
      const index = MOCK_ROLES.findIndex(r => r.id === id)
      if (index !== -1) {
        MOCK_ROLES.splice(index, 1)
        return Promise.resolve({ success: true })
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    console.error('API Error:', error)
    throw error
  }
}

export const roleService = new RoleService() 