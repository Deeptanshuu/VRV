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
  Tag,
  TagLabel,
  Tooltip,
  useColorModeValue,
  Stack,
  Divider,
  useBreakpointValue,
  Spinner,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon,
  KeyIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { roleService } from '../services/roleService'
import Modal from '../components/common/Modal'
import RoleForm from '../components/roles/RoleForm'
import RolePermissions from '../components/roles/RolePermissions'
import PageHeader from '../components/layout/PageHeader'

function Roles() {
  const [roles, setRoles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null)
  const [roleToDelete, setRoleToDelete] = useState(null)
  const { isOpen: isFormOpen, onOpen: openForm, onClose: closeForm } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: openDelete, onClose: closeDelete } = useDisclosure()
  const { isOpen: isPermissionsOpen, onOpen: openPermissions, onClose: closePermissions } = useDisclosure()
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const headerBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const displayMode = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      const data = await roleService.getRoles()
      setRoles(data)
    } catch (error) {
      console.error('Error loading roles:', error)
      toast({
        title: 'Error loading roles',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddRole = () => {
    setSelectedRole(null)
    openForm()
  }

  const handleEditRole = (role) => {
    setSelectedRole(role)
    openForm()
  }

  const handleDeleteClick = (role) => {
    setRoleToDelete(role)
    openDelete()
  }

  const handlePermissionsClick = (role) => {
    setSelectedRole(role)
    openPermissions()
  }

  const handleRoleSubmit = async (roleData) => {
    try {
      if (selectedRole) {
        await roleService.updateRole(selectedRole.id, roleData)
        toast({
          title: 'Role updated successfully',
          status: 'success',
          duration: 3000,
        })
      } else {
        await roleService.createRole(roleData)
        toast({
          title: 'Role created successfully',
          status: 'success',
          duration: 3000,
        })
      }
      loadRoles()
      closeForm()
    } catch {
      toast({
        title: 'Error saving role',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handlePermissionsSubmit = async (permissions) => {
    try {
      await roleService.updateRole(selectedRole.id, { ...selectedRole, permissions })
      toast({
        title: 'Permissions updated successfully',
        status: 'success',
        duration: 3000,
      })
      loadRoles()
      closePermissions()
    } catch {
      toast({
        title: 'Error updating permissions',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await roleService.deleteRole(roleToDelete.id)
      toast({
        title: 'Role deleted successfully',
        status: 'success',
        duration: 3000,
      })
      loadRoles()
      closeDelete()
    } catch {
      toast({
        title: 'Error deleting role',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const getRoleBadgeColor = (roleName) => {
    switch (roleName.toLowerCase()) {
      case 'admin':
        return 'purple'
      case 'manager':
        return 'blue'
      case 'user':
        return 'gray'
      default:
        return 'green'
    }
  }

  const renderMobileCard = (role) => (
    <Card
      key={role.id}
      bg={bgColor}
      borderColor={borderColor}
      mb={4}
      overflow="hidden"
    >
      <Box p={4}>
        <Stack spacing={4}>
          {/* Role Header */}
          <HStack justify="space-between" align="start">
            <HStack spacing={3}>
              <Box
                bg="vrv.100"
                p={2}
                rounded="lg"
                color="vrv.500"
              >
                <KeyIcon className="h-5 w-5" />
              </Box>
              <Box>
                <Text fontWeight="medium">{role.name}</Text>
                <Text fontSize="sm" color={textColor}>{role.id}</Text>
              </Box>
            </HStack>
            <Badge
              colorScheme={role.status === 'Active' ? 'green' : 'red'}
              rounded="full"
              px={2}
              py={1}
            >
              {role.status}
            </Badge>
          </HStack>

          <Divider />

          {/* Role Details */}
          <Stack spacing={3}>
            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Description</Text>
              <Text>{role.description}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color={textColor} mb={2}>Permissions</Text>
              <Wrap spacing={2}>
                {role.permissions.map((permission, index) => (
                  <WrapItem key={index}>
                    <Badge colorScheme="vrv" variant="subtle">
                      {permission}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>

            <Box>
              <Text fontSize="sm" color={textColor} mb={1}>Users with this role</Text>
              <Text fontWeight="medium">{role.userCount} users</Text>
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
              onClick={() => handleEditRole(role)}
              aria-label="Edit role"
            />
            <IconButton
              icon={<TrashIcon className="h-4 w-4" />}
              variant="ghost"
              colorScheme="red"
              size="sm"
              onClick={() => handleDeleteClick(role)}
              aria-label="Delete role"
              isDisabled={role.name === 'Admin'}
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
            title="Roles"
            description="Manage system roles and permissions"
            buttonLabel="Add Role"
            buttonIcon={PlusIcon}
            onButtonClick={handleAddRole}
          />

          <Box>
            {displayMode === 'desktop' ? (
              <Box overflowX="auto">
                <Table>
                  <Thead bg={headerBg}>
                    <Tr>
                      <Th borderColor={borderColor}>Role</Th>
                      <Th borderColor={borderColor}>Description</Th>
                      <Th borderColor={borderColor}>Permissions</Th>
                      <Th borderColor={borderColor}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isLoading ? (
                      <Tr>
                        <Td colSpan={4} textAlign="center" py={8} borderColor={borderColor}>
                          Loading...
                        </Td>
                      </Tr>
                    ) : (
                      roles.map((role) => (
                        <Tr key={role.id}>
                          <Td borderColor={borderColor}>
                            <HStack spacing={3}>
                              <Box
                                bg="vrv.100"
                                p={2}
                                rounded="lg"
                                color="vrv.500"
                              >
                                <ShieldCheckIcon className="h-5 w-5" />
                              </Box>
                              <Box>
                                <Badge
                                  colorScheme={getRoleBadgeColor(role.name)}
                                  px={2}
                                  py={1}
                                  rounded="full"
                                >
                                  {role.name}
                                </Badge>
                              </Box>
                            </HStack>
                          </Td>
                          <Td borderColor={borderColor}>
                            <Text color={textColor}>{role.description}</Text>
                          </Td>
                          <Td borderColor={borderColor}>
                            <HStack spacing={2} flexWrap="wrap">
                              {role.permissions.slice(0, 2).map((permission) => (
                                <Tag
                                  key={permission}
                                  size="sm"
                                  variant="subtle"
                                  colorScheme="vrv"
                                >
                                  <TagLabel>{permission}</TagLabel>
                                </Tag>
                              ))}
                              {role.permissions.length > 2 && (
                                <Tooltip
                                  label={role.permissions.slice(2).join(', ')}
                                  hasArrow
                                  placement="top"
                                >
                                  <Tag
                                    size="sm"
                                    variant="subtle"
                                    colorScheme="gray"
                                    cursor="pointer"
                                  >
                                    <TagLabel>+{role.permissions.length - 2} more</TagLabel>
                                  </Tag>
                                </Tooltip>
                              )}
                            </HStack>
                          </Td>
                          <Td borderColor={borderColor}>
                            <HStack spacing={2}>
                              <IconButton
                                icon={<KeyIcon className="h-4 w-4" />}
                                variant="ghost"
                                colorScheme="vrv"
                                size="sm"
                                onClick={() => handlePermissionsClick(role)}
                                aria-label="Edit permissions"
                              />
                              <IconButton
                                icon={<PencilSquareIcon className="h-4 w-4" />}
                                variant="ghost"
                                colorScheme="vrv"
                                size="sm"
                                onClick={() => handleEditRole(role)}
                                aria-label="Edit role"
                              />
                              <IconButton
                                icon={<TrashIcon className="h-4 w-4" />}
                                variant="ghost"
                                colorScheme="red"
                                size="sm"
                                onClick={() => handleDeleteClick(role)}
                                aria-label="Delete role"
                                isDisabled={role.name === 'Admin'}
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
                ) : roles.length === 0 ? (
                  <Text textAlign="center" py={8} color={textColor}>
                    No roles found matching the filters
                  </Text>
                ) : (
                  roles.map(renderMobileCard)
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={selectedRole ? 'Edit Role' : 'Add New Role'}
      >
        <RoleForm
          role={selectedRole}
          onSubmit={handleRoleSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <Modal
        isOpen={isPermissionsOpen}
        onClose={closePermissions}
        title={`Manage Permissions - ${selectedRole?.name}`}
      >
        <RolePermissions
          role={selectedRole}
          onSave={handlePermissionsSubmit}
          onCancel={closePermissions}
        />
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        title="Delete Role"
      >
        <Box>
          <Text mb={4}>
            Are you sure you want to delete the {roleToDelete?.name} role? This action cannot be undone.
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

export default Roles 