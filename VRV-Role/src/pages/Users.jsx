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
} from '@heroicons/react/24/outline'
import { userService } from '../services/userService'
import Modal from '../components/common/Modal'
import UserForm from '../components/users/UserForm'
import { format, formatDistanceToNow } from 'date-fns'

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

  return (
    <Box p={8}>
      <Card variant="outline" bg={bgColor} borderColor={borderColor} overflow="hidden">
        <Box px={6} py={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg" mb={1}>Users</Heading>
              <Text color={textColor}>Manage system users and their roles</Text>
            </Box>
            <Button
              leftIcon={<PlusIcon className="h-5 w-5" />}
              colorScheme="vrv"
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </Flex>
        </Box>

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
              ) : (
                users.map((user) => (
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