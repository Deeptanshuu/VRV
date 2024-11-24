import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Badge,
  Heading,
  HStack,
  useDisclosure,
  Flex,
  Text,
  Card,
  useToast,
  useColorModeValue,
  VStack,
  Progress,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Stack,
  Spinner,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react'
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon,
  UsersIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Modal from '../components/common/Modal'
import DepartmentForm from '../components/departments/DepartmentForm'
import { departmentService } from '../services/departmentService'
import PageHeader from '../components/layout/PageHeader'

function Departments() {
  const [departments, setDepartments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [departmentToDelete, setDepartmentToDelete] = useState(null)
  const { isOpen: isFormOpen, onOpen: openForm, onClose: closeForm } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: openDelete, onClose: closeDelete } = useDisclosure()
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const headerBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    location: '',
  })

  useEffect(() => {
    loadDepartments()
  }, [])

  const loadDepartments = async () => {
    try {
      const data = await departmentService.getDepartments()
      setDepartments(data)
    } catch (error) {
      toast({
        title: 'Error loading departments',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDepartment = () => {
    setSelectedDepartment(null)
    openForm()
  }

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department)
    openForm()
  }

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department)
    openDelete()
  }

  const handleDepartmentSubmit = async (departmentData) => {
    try {
      if (selectedDepartment) {
        await departmentService.updateDepartment(selectedDepartment.id, departmentData)
        toast({
          title: 'Department Updated',
          description: 'Department has been successfully updated',
          status: 'success',
          duration: 3000,
        })
      } else {
        await departmentService.createDepartment(departmentData)
        toast({
          title: 'Department Created',
          description: 'New department has been successfully created',
          status: 'success',
          duration: 3000,
        })
      }
      loadDepartments()
      closeForm()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while saving the department',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await departmentService.deleteDepartment(departmentToDelete.id)
      toast({
        title: 'Department Deleted',
        description: 'Department has been successfully deleted',
        status: 'success',
        duration: 3000,
      })
      loadDepartments()
      closeDelete()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Cannot delete department with active employees',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = 
      filters.search === '' ||
      dept.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      dept.head.toLowerCase().includes(filters.search.toLowerCase()) ||
      dept.location.toLowerCase().includes(filters.search.toLowerCase())

    const matchesStatus = 
      filters.status === '' || 
      dept.status === filters.status

    const matchesLocation = 
      filters.location === '' || 
      dept.location.includes(filters.location)

    return matchesSearch && matchesStatus && matchesLocation
  })

  // Get unique locations for filter
  const locations = [...new Set(departments.map(dept => dept.location))]

  // Determine display mode based on screen size
  const displayMode = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  const renderMobileCard = (department) => (
    <Card
      key={department.id}
      bg={bgColor}
      border="1px solid"
      borderColor="#304945"
      mb={4}
      overflow="hidden"
    >
      <Box p={4}>
        <Stack spacing={4}>
          {/* Department Header */}
          <HStack justify="space-between" align="start">
            <HStack spacing={3}>
              <Box
                bg="vrv.100"
                p={2}
                rounded="lg"
                color="vrv.500"
              >
                <BuildingOfficeIcon className="h-5 w-5" />
              </Box>
              <Box>
                <Text fontWeight="medium">{department.name}</Text>
                <Text fontSize="sm" color={textColor}>{department.id}</Text>
              </Box>
            </HStack>
            <Badge
              colorScheme={department.status === 'Active' ? 'green' : 'red'}
              rounded="full"
              px={2}
              py={1}
            >
              {department.status}
            </Badge>
          </HStack>

          <Divider />

          {/* Department Details */}
          <Stack spacing={3}>
            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Head & Location</Text>
              <Text fontWeight="medium">{department.head}</Text>
              <Text fontSize="sm">{department.location}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Employees</Text>
              <HStack>
                <UsersIcon className="h-5 w-5 text-gray-400" />
                <Text>{department.employeeCount}</Text>
              </HStack>
            </Box>

            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Budget</Text>
              <Text fontWeight="medium">
                {formatBudget(department.budgetSpent)} / {formatBudget(department.budget)}
              </Text>
              <Progress
                value={(department.budgetSpent / department.budget) * 100}
                size="sm"
                width="100%"
                colorScheme={
                  (department.budgetSpent / department.budget) > 0.9
                    ? 'red'
                    : (department.budgetSpent / department.budget) > 0.7
                    ? 'yellow'
                    : 'green'
                }
                rounded="full"
                mt={1}
              />
            </Box>
          </Stack>

          <Divider />

          {/* Actions */}
          <HStack justify="flex-end" spacing={2}>
            <IconButton
              icon={<PencilSquareIcon className="h-4 w-4" />}
              variant="ghost"
              colorScheme="vrv"
              size="sm"
              onClick={() => handleEditDepartment(department)}
              aria-label="Edit department"
            />
            <IconButton
              icon={<TrashIcon className="h-4 w-4" />}
              variant="ghost"
              colorScheme="red"
              size="sm"
              onClick={() => handleDeleteClick(department)}
              aria-label="Delete department"
              isDisabled={department.employeeCount > 0}
            />
          </HStack>
        </Stack>
      </Box>
    </Card>
  )

  return (
    <Box p={8}>
      <Card variant="outline" bg={bgColor} border="1px solid" borderColor="#304945" overflow="hidden">
        <Box px={6} py={4}>
          <PageHeader
            title="Departments"
            description="Manage organization departments"
            buttonLabel="Add Department"
            buttonIcon={PlusIcon}
            onButtonClick={handleAddDepartment}
          />

          <Stack 
            direction={{ base: 'column', md: 'row' }} 
            spacing={4} 
            mb={6}
          >
            <InputGroup maxW={{ base: 'full', md: '300px' }}>
              <InputLeftElement pointerEvents="none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </InputLeftElement>
              <Input
                placeholder="Search departments..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>

            <Select
              placeholder="All Statuses"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW={{ base: 'full', md: '200px' }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>

            <Select
              placeholder="All Locations"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              maxW={{ base: 'full', md: '200px' }}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </Select>
          </Stack>

          <Text color={textColor} fontSize="sm" mb={4}>
            Showing {filteredDepartments.length} of {departments.length} departments
          </Text>
        </Box>

        {/* Responsive Table/Cards */}
        <Box>
          {displayMode === 'desktop' ? (
            <Box overflowX="auto">
              <Table>
                <Thead bg={headerBg}>
                  <Tr>
                    <Th borderColor={borderColor}>Department</Th>
                    <Th borderColor={borderColor}>Head & Location</Th>
                    <Th borderColor={borderColor}>Employees</Th>
                    <Th borderColor={borderColor}>Budget</Th>
                    <Th borderColor={borderColor}>Status</Th>
                    <Th borderColor={borderColor}>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={8} borderColor={borderColor}>
                        <Spinner size="sm" mr={2} />
                        Loading...
                      </Td>
                    </Tr>
                  ) : filteredDepartments.length === 0 ? (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={8} borderColor={borderColor}>
                        No departments found matching the filters
                      </Td>
                    </Tr>
                  ) : (
                    filteredDepartments.map((department) => (
                      <Tr key={department.id}>
                        <Td borderColor={borderColor}>
                          <HStack spacing={3}>
                            <Box
                              bg="vrv.100"
                              p={2}
                              rounded="lg"
                              color="vrv.500"
                            >
                              <BuildingOfficeIcon className="h-5 w-5" />
                            </Box>
                            <Box>
                              <Text fontWeight="medium">{department.name}</Text>
                              <Text fontSize="sm" color={textColor}>{department.id}</Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="medium">{department.head}</Text>
                            <Text fontSize="sm" color={textColor}>{department.location}</Text>
                          </VStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <HStack>
                            <UsersIcon className="h-5 w-5 text-gray-400" />
                            <Text>{department.employeeCount}</Text>
                          </HStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <VStack align="start" spacing={2}>
                            <Text fontWeight="medium">
                              {formatBudget(department.budgetSpent)} / {formatBudget(department.budget)}
                            </Text>
                            <Progress
                              value={(department.budgetSpent / department.budget) * 100}
                              size="sm"
                              width="100%"
                              colorScheme={
                                (department.budgetSpent / department.budget) > 0.9
                                  ? 'red'
                                  : (department.budgetSpent / department.budget) > 0.7
                                  ? 'yellow'
                                  : 'green'
                              }
                              rounded="full"
                            />
                          </VStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Badge
                            colorScheme={department.status === 'Active' ? 'green' : 'red'}
                            rounded="full"
                            px={2}
                            py={1}
                          >
                            {department.status}
                          </Badge>
                        </Td>
                        <Td borderColor={borderColor}>
                          <HStack spacing={2}>
                            <IconButton
                              icon={<PencilSquareIcon className="h-4 w-4" />}
                              variant="ghost"
                              colorScheme="vrv"
                              size="sm"
                              onClick={() => handleEditDepartment(department)}
                              aria-label="Edit department"
                            />
                            <IconButton
                              icon={<TrashIcon className="h-4 w-4" />}
                              variant="ghost"
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDeleteClick(department)}
                              aria-label="Delete department"
                              isDisabled={department.employeeCount > 0}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Box px={4} py={2}>
              {isLoading ? (
                <Flex justify="center" align="center" py={8}>
                  <Spinner size="sm" mr={2} />
                  <Text>Loading...</Text>
                </Flex>
              ) : filteredDepartments.length === 0 ? (
                <Text textAlign="center" py={8} color={textColor}>
                  No departments found matching the filters
                </Text>
              ) : (
                filteredDepartments.map(renderMobileCard)
              )}
            </Box>
          )}
        </Box>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={selectedDepartment ? 'Edit Department' : 'Add New Department'}
      >
        <DepartmentForm
          department={selectedDepartment}
          onSubmit={handleDepartmentSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        title="Delete Department"
      >
        <Box>
          <Text mb={4}>
            Are you sure you want to delete the {departmentToDelete?.name} department? This action cannot be undone.
          </Text>
          <HStack spacing={3} justify="flex-end">
            <Button variant="outline" onClick={closeDelete}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </HStack>
        </Box>
      </Modal>
    </Box>
  )
}

export default Departments 