import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  FormErrorMessage,
  useToast,
  HStack,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import { roleService } from '../../services/roleService'
import { departmentService } from '../../services/departmentService'

function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    department: user?.department || '',
    phone: user?.phone || '',
    location: user?.location || '',
    status: user?.status || 'Active',
  })

  const [roles, setRoles] = useState([])
  const [departments, setDepartments] = useState([])
  const [errors, setErrors] = useState({})
  const toast = useToast()

  // Fetch roles when component mounts
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await roleService.getRoles()
        setRoles(rolesData)
        // Set default role if none selected
        if (!formData.role && rolesData.length > 0) {
          setFormData(prev => ({ ...prev, role: rolesData[0].name }))
        }
      } catch (error) {
        toast({
          title: 'Error loading roles',
          description: 'Could not load available roles',
          status: 'error',
          duration: 3000,
        })
      }
    }
    loadRoles()
  }, [])

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const deptData = await departmentService.getDepartments()
        setDepartments(deptData.filter(dept => dept.status === 'Active'))
      } catch (error) {
        toast({
          title: 'Error loading departments',
          description: 'Could not load available departments',
          status: 'error',
          duration: 3000,
        })
      }
    }
    loadDepartments()
  }, [])

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role'
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Department is required'
    }

    // Phone validation
    if (formData.phone) {
      // Remove any non-digit characters
      const phoneDigits = formData.phone.replace(/\D/g, '')
      if (phoneDigits.length !== 10) {
        newErrors.phone = 'Phone number must be exactly 10 digits'
      }
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    } else {
      toast({
        title: 'Form Validation Error',
        description: 'Please check the form for errors',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Special handling for phone numbers
    if (name === 'phone') {
      // Remove any non-digit characters
      const phoneDigits = value.replace(/\D/g, '')
      // Limit to 10 digits
      const truncatedPhone = phoneDigits.slice(0, 10)
      setFormData(prev => ({ ...prev, [name]: truncatedPhone }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            onBlur={() => validateForm()}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            onBlur={() => validateForm()}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.role} isRequired>
          <FormLabel>Role</FormLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.role}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.department} isRequired>
          <FormLabel>Department</FormLabel>
          <Select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.department}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon>+1</InputLeftAddon>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              maxLength={10}
              pattern="\d{10}"
            />
          </InputGroup>
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.location} isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
            onBlur={() => validateForm()}
          />
          <FormErrorMessage>{errors.location}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </FormControl>

        <HStack spacing={3} width="full" justify="flex-end" pt={4}>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="vrv">
            {user ? 'Update' : 'Create'} User
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    department: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default UserForm 