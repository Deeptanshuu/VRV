import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  useToast,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react'
import { userService } from '../../services/userService'

function DepartmentForm({ department, onSubmit, onCancel }) {
  const [managers, setManagers] = useState([])
  const [formData, setFormData] = useState({
    name: department?.name || '',
    head: department?.head || '',
    headId: department?.headId || '',
    budget: department?.budget || '',
    budgetSpent: department?.budgetSpent || 0,
    location: department?.location || '',
    status: department?.status || 'Active',
    description: department?.description || '',
    projects: department?.projects || 0,
    teamLeads: department?.teamLeads || [],
  })
  const [errors, setErrors] = useState({})
  const toast = useToast()

  // Fetch managers when component mounts
  useEffect(() => {
    const loadManagers = async () => {
      try {
        const users = await userService.getUsers()
        // Filter only active managers
        const availableManagers = users.filter(
          user => user.role === 'Manager' && user.status === 'Active'
        )
        setManagers(availableManagers)

        // If editing and no head selected, try to find the current head
        if (department?.headId && !formData.headId) {
          const currentHead = availableManagers.find(m => m.id === department.headId)
          if (currentHead) {
            setFormData(prev => ({
              ...prev,
              headId: currentHead.id,
              head: currentHead.name
            }))
          }
        }
      } catch (error) {
        toast({
          title: 'Error loading managers',
          description: 'Could not load available managers',
          status: 'error',
          duration: 3000,
        })
      }
    }
    loadManagers()
  }, [department])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required'
    }

    if (!formData.headId) {
      newErrors.headId = 'Department head is required'
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required'
    } else if (isNaN(formData.budget) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const selectedManager = managers.find(manager => manager.id === formData.headId)
      onSubmit({
        ...formData,
        head: selectedManager?.name || '',
        budget: Number(formData.budget),
        budgetSpent: Number(formData.budgetSpent),
        projects: Number(formData.projects),
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }

    // If changing department head, update both headId and head name
    if (name === 'headId') {
      const selectedManager = managers.find(manager => manager.id === value)
      if (selectedManager) {
        setFormData(prev => ({
          ...prev,
          headId: value,
          head: selectedManager.name
        }))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel>Department Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter department name"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter department description"
          />
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.headId} isRequired>
          <FormLabel>Department Head <br /> (Only Active Managers)</FormLabel>
          <Select
            name="headId"
            value={formData.headId}
            onChange={handleChange}
            placeholder="Select Department Head"
          >
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name} ({manager.email})
              </option>
            ))}
          </Select>
          {managers.length === 0 && (
            <FormErrorMessage>
              No active managers available. Please create a manager first.
            </FormErrorMessage>
          )}
          <FormErrorMessage>{errors.headId}</FormErrorMessage>
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl isInvalid={!!errors.budget} isRequired>
            <FormLabel>Budget</FormLabel>
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter budget amount"
              />
            </InputGroup>
            <FormErrorMessage>{errors.budget}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Budget Spent</FormLabel>
            <InputGroup>
              <InputLeftAddon>$</InputLeftAddon>
              <Input
                name="budgetSpent"
                type="number"
                value={formData.budgetSpent}
                onChange={handleChange}
                placeholder="Enter spent amount"
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl isInvalid={!!errors.location} isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
            <FormErrorMessage>{errors.location}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Projects</FormLabel>
            <Input
              name="projects"
              type="number"
              value={formData.projects}
              onChange={handleChange}
              placeholder="Number of projects"
            />
          </FormControl>
        </SimpleGrid>

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
          <Button 
            type="submit" 
            colorScheme="vrv"
            isDisabled={managers.length === 0}
          >
            {department ? 'Update' : 'Create'} Department
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

DepartmentForm.propTypes = {
  department: PropTypes.shape({
    name: PropTypes.string,
    head: PropTypes.string,
    headId: PropTypes.string,
    budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    budgetSpent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    projects: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    teamLeads: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default DepartmentForm 