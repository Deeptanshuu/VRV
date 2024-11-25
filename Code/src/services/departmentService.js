import { userService } from './userService'

let MOCK_DEPARTMENTS = [
  {
    id: 'DEP001',
    name: 'IT',
    head: 'Rajesh Kumar',
    headId: 'USR001',
    employeeCount: 15,
    budget: 7500000,
    budgetSpent: 4250000,
    status: 'Active',
    location: 'Bangalore, India',
    description: 'Information Technology and Systems',
    createdAt: '2023-01-15',
    lastUpdated: '2024-01-10T09:30:00',
    projects: 8,
    teamLeads: ['Amit Patel', 'Priya Sharma'],
  },
  {
    id: 'DEP002',
    name: 'HR',
    head: 'Deepika Singh',
    headId: 'USR004',
    employeeCount: 8,
    budget: 4000000,
    budgetSpent: 2250000,
    status: 'Active',
    location: 'Mumbai, India',
    description: 'Human Resources Management',
    createdAt: '2023-02-20',
    lastUpdated: '2024-01-09T14:20:00',
    projects: 4,
    teamLeads: ['Neha Gupta'],
  },
  {
    id: 'DEP003',
    name: 'Sales',
    head: 'Vikram Malhotra',
    headId: 'USR006',
    employeeCount: 20,
    budget: 10000000,
    budgetSpent: 8000000,
    status: 'Active',
    location: 'Delhi, India',
    description: 'Sales and Business Development',
    createdAt: '2023-03-10',
    lastUpdated: '2024-01-08T11:45:00',
    projects: 12,
    teamLeads: ['Arjun Reddy', 'Ananya Desai'],
  },
  {
    id: 'DEP004',
    name: 'Marketing',
    head: 'Meera Verma',
    headId: 'USR008',
    employeeCount: 12,
    budget: 6000000,
    budgetSpent: 4500000,
    status: 'Active',
    location: 'Hyderabad, India',
    description: 'Marketing and Brand Management',
    createdAt: '2023-04-05',
    lastUpdated: '2024-01-07T16:30:00',
    projects: 6,
    teamLeads: ['Karthik Iyer'],
  },
  {
    id: 'DEP005',
    name: 'Finance',
    head: 'Arun Joshi',
    headId: 'USR010',
    employeeCount: 10,
    budget: 9000000,
    budgetSpent: 6000000,
    status: 'Active',
    location: 'Chennai, India',
    description: 'Financial Planning and Analysis',
    createdAt: '2023-05-15',
    lastUpdated: '2024-01-06T13:15:00',
    projects: 5,
    teamLeads: ['Ravi Shankar', 'Pooja Mehta'],
  },
  {
    id: 'DEP006',
    name: 'Operations',
    head: 'Sanjay Kapoor',
    headId: 'USR012',
    employeeCount: 25,
    budget: 12500000,
    budgetSpent: 9000000,
    status: 'Active',
    location: 'Pune, India',
    description: 'Operations and Logistics',
    createdAt: '2023-06-20',
    lastUpdated: '2024-01-05T10:45:00',
    projects: 10,
    teamLeads: ['Rahul Khanna', 'Sneha Patel'],
  },
  {
    id: 'DEP007',
    name: 'R&D',
    head: 'Suresh Menon',
    headId: 'USR014',
    employeeCount: 15,
    budget: 15000000,
    budgetSpent: 10000000,
    status: 'Active',
    location: 'Kolkata, India',
    description: 'Research and Development',
    createdAt: '2023-07-10',
    lastUpdated: '2024-01-04T15:20:00',
    projects: 7,
    teamLeads: ['Aditya Shah', 'Nisha Verma'],
  },
  {
    id: 'DEP008',
    name: 'Legal',
    head: 'Anjali Desai',
    headId: 'USR016',
    employeeCount: 6,
    budget: 8000000,
    budgetSpent: 5000000,
    status: 'Active',
    location: 'Ahmedabad, India',
    description: 'Legal Affairs and Compliance',
    createdAt: '2023-08-15',
    lastUpdated: '2024-01-03T09:30:00',
    projects: 3,
    teamLeads: ['Rohit Sharma'],
  },
  {
    id: 'DEP009',
    name: 'Customer Support',
    head: 'Kavita Krishnan',
    headId: 'USR018',
    employeeCount: 30,
    budget: 7000000,
    budgetSpent: 4750000,
    status: 'Active',
    location: 'Noida, India',
    description: 'Customer Service and Support',
    createdAt: '2023-09-20',
    lastUpdated: '2024-01-02T14:45:00',
    projects: 4,
    teamLeads: ['Vivek Kumar', 'Divya Singh'],
  },
  {
    id: 'DEP010',
    name: 'Quality Assurance',
    head: 'Prakash Rao',
    headId: 'USR020',
    employeeCount: 8,
    budget: 4500000,
    budgetSpent: 3000000,
    status: 'Active',
    location: 'Gurgaon, India',
    description: 'Quality Control and Testing',
    createdAt: '2023-10-25',
    lastUpdated: '2024-01-01T11:15:00',
    projects: 5,
    teamLeads: ['Shweta Tiwari'],
  }
]

class DepartmentService {
  async getDepartments() {
    try {
      // Update employee counts based on user data
      const users = await userService.getUsers()
      MOCK_DEPARTMENTS = MOCK_DEPARTMENTS.map(dept => ({
        ...dept,
        employeeCount: users.filter(user => user.department === dept.name).length
      }))
      return Promise.resolve(MOCK_DEPARTMENTS)
    } catch (error) {
      this.handleError(error)
    }
  }

  async getDepartmentById(id) {
    try {
      const department = MOCK_DEPARTMENTS.find(d => d.id === id)
      return Promise.resolve(department)
    } catch (error) {
      this.handleError(error)
    }
  }

  async createDepartment(departmentData) {
    try {
      const newId = `DEP${String(MOCK_DEPARTMENTS.length + 1).padStart(3, '0')}`
      const newDepartment = {
        id: newId,
        ...departmentData,
        employeeCount: 0,
        budgetSpent: 0,
      }
      MOCK_DEPARTMENTS.push(newDepartment)
      return Promise.resolve(newDepartment)
    } catch (error) {
      this.handleError(error)
    }
  }

  async updateDepartment(id, departmentData) {
    try {
      const index = MOCK_DEPARTMENTS.findIndex(d => d.id === id)
      if (index !== -1) {
        MOCK_DEPARTMENTS[index] = {
          ...MOCK_DEPARTMENTS[index],
          ...departmentData,
        }
        return Promise.resolve(MOCK_DEPARTMENTS[index])
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  async deleteDepartment(id) {
    try {
      // Check if department has employees
      const users = await userService.getUsers()
      const departmentToDelete = MOCK_DEPARTMENTS.find(d => d.id === id)
      const hasEmployees = users.some(user => user.department === departmentToDelete.name)

      if (hasEmployees) {
        throw new Error('Cannot delete department with active employees')
      }

      MOCK_DEPARTMENTS = MOCK_DEPARTMENTS.filter(d => d.id !== id)
      return Promise.resolve({ success: true })
    } catch (error) {
      this.handleError(error)
    }
  }

  handleError(error) {
    console.error('Department Service Error:', error)
    throw error
  }
}

export const departmentService = new DepartmentService() 