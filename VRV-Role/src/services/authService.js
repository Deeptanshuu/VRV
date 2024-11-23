const MOCK_USERS = [
  {
    email: 'admin@vrv.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'Admin',
    department: 'IT',
  },
  {
    email: 'manager@vrv.com',
    password: 'manager123',
    name: 'John Manager',
    role: 'Manager',
    department: 'Sales',
  },
  {
    email: 'employee@vrv.com',
    password: 'employee123',
    name: 'Jane Employee',
    role: 'Employee',
    department: 'Marketing',
  }
]

class AuthService {
  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          u => u.email === email && u.password === password
        )
        
        if (user) {
          const { password, ...userWithoutPassword } = user
          const token = `mock-jwt-token-${user.role.toLowerCase()}`
          
          // Store auth data
          localStorage.setItem('user', JSON.stringify(userWithoutPassword))
          localStorage.setItem('token', token)
          
          resolve(userWithoutPassword)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 800)
    })
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  hasRole(roles) {
    const user = this.getCurrentUser()
    return user && roles.includes(user.role)
  }
}

export const authService = new AuthService() 