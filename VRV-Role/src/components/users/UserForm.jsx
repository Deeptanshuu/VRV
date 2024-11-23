import { useState } from 'react'
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

function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'User',
    department: user?.department || '',
    phone: user?.phone || '',
    location: user?.location || '',
    status: user?.status || 'Active',
  })

  const [errors, setErrors] = useState({})
  const toast = useToast()

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
    if (!['User', 'Manager', 'Admin'].includes(formData.role)) {
      newErrors.role = 'Please select a valid role'
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Department is required'
    }

    // Phone validation (optional)
    if (formData.phone) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
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
    setFormData(prev => ({ ...prev, [name]: value }))
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
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
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
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </Select>
          <FormErrorMessage>{errors.department}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon>+1</InputLeftAddon>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              onBlur={() => validateForm()}
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