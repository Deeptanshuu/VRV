/* eslint-disable no-unused-vars */
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
  VStack,
  useDisclosure,
  Flex,
  Text,
  Card,
  useToast,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Select,
  Divider,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react'
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon,
  UserCircleIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { userService } from '../services/userService'
import Modal from '../components/common/Modal'
import UserForm from '../components/users/UserForm'
import { format, formatDistanceToNow } from 'date-fns'
import PageHeader from '../components/layout/PageHeader'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const { isOpen: isFormOpen, onOpen: openForm, onClose: closeForm } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: openDelete, onClose: closeDelete } = useDisclosure()
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const headerBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const userIconBg = useColorModeValue('vrv.100', 'vrv.900')

  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    department: '',
  })

  const departments = ['IT', 'HR', 'Sales', 'Marketing', 'Finance']
  const roles = ['Admin', 'Manager', 'User']
  const statuses = ['Active', 'Inactive']

  const displayMode = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await userService.getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
      toast({
        title: 'Error loading users',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    openForm()
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    openForm()
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    openDelete()
  }

  const handleUserSubmit = async (userData) => {
    try {
      if (selectedUser) {
        await userService.updateUser(selectedUser.id, userData)
        toast({
          title: 'User updated successfully',
          status: 'success',
          duration: 3000,
        })
      } else {
        await userService.createUser(userData)
        toast({
          title: 'User created successfully',
          status: 'success',
          duration: 3000,
        })
      }
      loadUsers()
      closeForm()
    } catch (error) {
      toast({
        title: 'Error saving user',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await userService.deleteUser(userToDelete.id)
      toast({
        title: 'User deleted successfully',
        status: 'success',
        duration: 3000,
      })
      loadUsers()
      closeDelete()
    } catch (error) {
      toast({
        title: 'Error deleting user',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMM dd, yyyy')
    } catch {
      return 'N/A'
    }
  }

  const formatLastActive = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true })
    } catch {
      return 'N/A'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      filters.search === '' ||
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.id.toLowerCase().includes(filters.search.toLowerCase())

    const matchesRole = 
      filters.role === '' || 
      user.role === filters.role

    const matchesStatus = 
      filters.status === '' || 
      user.status === filters.status

    const matchesDepartment = 
      filters.department === '' || 
      user.department === filters.department

    return matchesSearch && matchesRole && matchesStatus && matchesDepartment
  })

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const renderMobileCard = (user) => (
    <Card
      key={user.id}
      bg={bgColor}
      borderColor={borderColor}
      mb={4}
      overflow="hidden"
    >
      <Box p={4}>
        <Stack spacing={4}>
          {/* User Header */}
          <HStack justify="space-between" align="start">
            <HStack spacing={3}>
              <Box
                bg={userIconBg}
                p={2}
                rounded="lg"
                color="vrv.500"
              >
                <UserCircleIcon className="h-5 w-5" />
              </Box>
              <Box>
                <Text fontWeight="medium">{user.name}</Text>
                <Text fontSize="sm" color={textColor}>{user.email}</Text>
              </Box>
            </HStack>
            <Badge
              colorScheme={user.status === 'Active' ? 'green' : 'red'}
              rounded="full"
              px={2}
              py={1}
            >
              {user.status}
            </Badge>
          </HStack>

          <Divider />

          {/* User Details */}
          <Stack spacing={3}>
            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Role & Department</Text>
              <Badge
                colorScheme={
                  user.role === 'Admin' 
                    ? 'purple' 
                    : user.role === 'Manager' 
                      ? 'blue' 
                      : 'gray'
                }
                mb={1}
              >
                {user.role}
              </Badge>
              <Text fontSize="sm">{user.department}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Contact</Text>
              <Text fontSize="sm">📞 {user.phone}</Text>
              <Text fontSize="sm">📍 {user.location}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Join Date</Text>
              <Text fontSize="sm">{formatDate(user.joinDate)}</Text>
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
              onClick={() => handleEditUser(user)}
              aria-label="Edit user"
            />
            <IconButton
              icon={<TrashIcon className="h-4 w-4" />}
              variant="ghost"
              colorScheme="red"
              size="sm"
              onClick={() => handleDeleteClick(user)}
              aria-label="Delete user"
            />
          </HStack>
        </Stack>
      </Box>
    </Card>
  )

  return (
    <Box p={8}>
      <Card variant="outline" bg={bgColor} borderColor={borderColor} overflow="hidden">
        <Box px={6} py={4}>
          <PageHeader
            title="Users"
            description="Manage system users and their roles"
            buttonLabel="Add User"
            buttonIcon={PlusIcon}
            onButtonClick={handleAddUser}
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
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>

            <Select
              placeholder="All Roles"
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              maxW={{ base: 'full', md: '200px' }}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Select>

            <Select
              placeholder="All Statuses"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW={{ base: 'full', md: '200px' }}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>

            <Select
              placeholder="All Departments"
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              maxW={{ base: 'full', md: '200px' }}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </Select>
          </Stack>

          <Text color={textColor} fontSize="sm" mb={4}>
            Showing {filteredUsers.length} of {users.length} users
          </Text>
        </Box>

        <Box>
          {displayMode === 'desktop' ? (
            <Box overflowX="auto">
              <Table>
                <Thead bg={headerBg}>
                  <Tr>
                    <Th borderColor={borderColor}>User ID</Th>
                    <Th borderColor={borderColor}>User Info</Th>
                    <Th borderColor={borderColor}>Contact</Th>
                    <Th borderColor={borderColor}>Role & Status</Th>
                    <Th borderColor={borderColor}>Activity</Th>
                    <Th borderColor={borderColor}>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={8} borderColor={borderColor}>
                        Loading...
                      </Td>
                    </Tr>
                  ) : filteredUsers.length === 0 ? (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={8} borderColor={borderColor}>
                        No users found matching the filters
                      </Td>
                    </Tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <Tr key={user.id}>
                        <Td borderColor={borderColor}>
                          <Text fontFamily="mono" fontSize="sm" color={textColor}>
                            {user.id}
                          </Text>
                        </Td>
                        <Td borderColor={borderColor}>
                          <HStack spacing={3}>
                            <Box
                              bg={userIconBg}
                              p={2}
                              rounded="lg"
                              color="vrv.500"
                            >
                              <UserCircleIcon className="h-5 w-5" />
                            </Box>
                            <Box>
                              <Text fontWeight="medium">{user.name}</Text>
                              <Text fontSize="sm" color={textColor}>{user.email}</Text>
                              <HStack spacing={2} mt={1}>
                                <Badge colorScheme="vrv" fontSize="xs">
                                  {user.department}
                                </Badge>
                                <Badge colorScheme="gray" fontSize="xs">
                                  {user.location}
                                </Badge>
                              </HStack>
                            </Box>
                          </HStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <VStack align="start" spacing={2}>
                            <HStack fontSize="sm" color={textColor}>
                              <PhoneIcon className="h-4 w-4" />
                              <Text>{user.phone}</Text>
                            </HStack>
                            <HStack fontSize="sm" color={textColor}>
                              <MapPinIcon className="h-4 w-4" />
                              <Text>{user.location}</Text>
                            </HStack>
                          </VStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <VStack align="start" spacing={2}>
                            <Badge
                              colorScheme={
                                user.role === 'Admin' 
                                  ? 'purple' 
                                  : user.role === 'Manager' 
                                    ? 'blue' 
                                    : 'gray'
                              }
                              rounded="full"
                              px={2}
                              py={1}
                            >
                              {user.role}
                            </Badge>
                            <Badge
                              colorScheme={user.status === 'Active' ? 'green' : 'red'}
                              rounded="full"
                              px={2}
                              py={1}
                            >
                              {user.status}
                            </Badge>
                          </VStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <VStack align="start" spacing={2}>
                            <HStack fontSize="sm" color={textColor}>
                              <CalendarIcon className="h-4 w-4" />
                              <Text>Joined {formatDate(user.joinDate)}</Text>
                            </HStack>
                            <HStack fontSize="sm" color={textColor}>
                              <ClockIcon className="h-4 w-4" />
                              <Text>Active {formatLastActive(user.lastActive)}</Text>
                            </HStack>
                          </VStack>
                        </Td>
                        <Td borderColor={borderColor}>
                          <HStack spacing={2}>
                            <IconButton
                              icon={<PencilSquareIcon className="h-4 w-4" />}
                              variant="ghost"
                              colorScheme="vrv"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              aria-label="Edit user"
                            />
                            <IconButton
                              icon={<TrashIcon className="h-4 w-4" />}
                              variant="ghost"
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDeleteClick(user)}
                              aria-label="Delete user"
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
              ) : filteredUsers.length === 0 ? (
                <Text textAlign="center" py={8} color={textColor}>
                  No users found matching the filters
                </Text>
              ) : (
                filteredUsers.map(renderMobileCard)
              )}
            </Box>
          )}
        </Box>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={selectedUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleUserSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        title="Delete User"
      >
        <Box>
          <Text mb={4}>
            Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
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

export default Users 