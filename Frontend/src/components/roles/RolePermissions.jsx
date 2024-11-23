import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  VStack,
  Checkbox,
  Button,
  Text,
  HStack,
  Divider,
} from '@chakra-ui/react'

const AVAILABLE_PERMISSIONS = {
  users: {
    name: 'User Management',
    permissions: [
      { id: 'users.view', name: 'View Users' },
      { id: 'users.create', name: 'Create Users' },
      { id: 'users.edit', name: 'Edit Users' },
      { id: 'users.delete', name: 'Delete Users' },
    ]
  },
  roles: {
    name: 'Role Management',
    permissions: [
      { id: 'roles.view', name: 'View Roles' },
      { id: 'roles.create', name: 'Create Roles' },
      { id: 'roles.edit', name: 'Edit Roles' },
      { id: 'roles.delete', name: 'Delete Roles' },
    ]
  },
  reports: {
    name: 'Reports',
    permissions: [
      { id: 'reports.view', name: 'View Reports' },
      { id: 'reports.create', name: 'Create Reports' },
      { id: 'reports.export', name: 'Export Reports' },
    ]
  }
}

function RolePermissions({ role, onSave, onCancel }) {
  const [selectedPermissions, setSelectedPermissions] = useState([])

  useEffect(() => {
    if (role?.permissions) {
      setSelectedPermissions(role.permissions)
    }
  }, [role])

  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId)
      }
      return [...prev, permissionId]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(selectedPermissions)
  }

  const handleSelectAll = (categoryPermissions) => {
    const allPermissionIds = categoryPermissions.map(p => p.id)
    const allSelected = categoryPermissions.every(p => selectedPermissions.includes(p.id))

    if (allSelected) {
      // Remove all permissions from this category
      setSelectedPermissions(prev => prev.filter(id => !allPermissionIds.includes(id)))
    } else {
      // Add all permissions from this category
      setSelectedPermissions(prev => {
        const newPermissions = [...prev]
        allPermissionIds.forEach(id => {
          if (!newPermissions.includes(id)) {
            newPermissions.push(id)
          }
        })
        return newPermissions
      })
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        {Object.entries(AVAILABLE_PERMISSIONS).map(([category, { name, permissions }]) => {
          const allSelected = permissions.every(p => selectedPermissions.includes(p.id))
          const someSelected = permissions.some(p => selectedPermissions.includes(p.id))

          return (
            <Box key={category}>
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="medium" color="gray.700">{name}</Text>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme={allSelected ? 'red' : 'vrv'}
                  onClick={() => handleSelectAll(permissions)}
                >
                  {allSelected ? 'Deselect All' : 'Select All'}
                </Button>
              </HStack>
              <VStack align="stretch" spacing={2} pl={4}>
                {permissions.map((permission) => (
                  <Checkbox
                    key={permission.id}
                    isChecked={selectedPermissions.includes(permission.id)}
                    onChange={() => handlePermissionToggle(permission.id)}
                    colorScheme="vrv"
                  >
                    <Text fontSize="sm">{permission.name}</Text>
                  </Checkbox>
                ))}
              </VStack>
              <Divider mt={4} />
            </Box>
          )
        })}
      </VStack>

      <HStack justify="flex-end" mt={6} spacing={3}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" colorScheme="vrv">
          Save Permissions
        </Button>
      </HStack>
    </Box>
  )
}

RolePermissions.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    permissions: PropTypes.arrayOf(PropTypes.string)
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default RolePermissions 