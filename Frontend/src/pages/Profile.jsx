import {
  Box,
  Card,
  CardBody,
  Stack,
  HStack,
  Avatar,
  Text,
  Badge,
  Divider,
  Button,
  useColorModeValue,
  SimpleGrid,
  Icon,
  VStack,
} from '@chakra-ui/react'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  KeyIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import { authService } from '../services/authService'
import PageHeader from '../components/layout/PageHeader'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ProfileField({ icon, label, value }) {
  const iconBg = useColorModeValue('vrv.50', 'whiteAlpha.100')
  const iconColor = useColorModeValue('vrv.500', 'whiteAlpha.900')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <HStack spacing={4} align="flex-start">
      <Box
        p={2}
        bg={iconBg}
        rounded="lg"
        color={iconColor}
      >
        <Icon as={icon} boxSize={5} />
      </Box>
      <VStack align="start" spacing={0}>
        <Text fontSize="sm" color={textColor}>{label}</Text>
        <Text fontWeight="medium">{value}</Text>
      </VStack>
    </HStack>
  )
}

ProfileField.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

function Profile() {
  const user = authService.getCurrentUser()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Not available'
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch (error) {
      console.error('Date formatting error:', error)
      return 'Invalid date'
    }
  }

  const formatDateTime = (dateString) => {
    try {
      if (!dateString) return 'Not available'
      return format(new Date(dateString), 'MMM dd, yyyy hh:mm a')
    } catch (error) {
      console.error('Date formatting error:', error)
      return 'Invalid date'
    }
  }

  return (
    <Box p={8}>
      <PageHeader
        title="Profile"
        description="Manage your personal information and settings"
      />

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        {/* Profile Overview */}
        <Card bg={bgColor} borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="center">
              <Avatar
                size="2xl"
                name={user?.name}
                bg="vrv.500"
              />
              <Box textAlign="center">
                <Text fontSize="xl" fontWeight="bold">{user?.name || 'N/A'}</Text>
                <Text color={textColor}>{user?.email || 'N/A'}</Text>
              </Box>
              <Badge
                colorScheme={user?.role === 'Admin' ? 'purple' : user?.role === 'Manager' ? 'blue' : 'gray'}
                px={3}
                py={1}
                rounded="full"
              >
                {user?.role || 'N/A'}
              </Badge>
              <Link to="/settings">
              <Button colorScheme="vrv" size="sm" width="full">
                Edit Profile
                </Button>
              </Link>
            </VStack>
          </CardBody>
        </Card>

        {/* Personal Information */}
        <Card bg={bgColor} borderColor={borderColor}>
          <CardBody>
            <Text fontSize="lg" fontWeight="medium" mb={6}>Personal Information</Text>
            <Stack spacing={6}>
              <ProfileField
                icon={UserIcon}
                label="Full Name"
                value={user?.name || 'N/A'}
              />
              <ProfileField
                icon={EnvelopeIcon}
                label="Email"
                value={user?.email || 'N/A'}
              />
              <ProfileField
                icon={PhoneIcon}
                label="Phone"
                value={user?.phone || 'Not provided'}
              />
              <ProfileField
                icon={MapPinIcon}
                label="Location"
                value={user?.location || 'N/A'}
              />
            </Stack>
          </CardBody>
        </Card>

        {/* Work Information */}
        <Card bg={bgColor} borderColor={borderColor}>
          <CardBody>
            <Text fontSize="lg" fontWeight="medium" mb={6}>Work Information</Text>
            <Stack spacing={6}>
              <ProfileField
                icon={KeyIcon}
                label="Role"
                value={user?.role || 'N/A'}
              />
              <ProfileField
                icon={BuildingOfficeIcon}
                label="Department"
                value={user?.department || 'N/A'}
              />
              <ProfileField
                icon={CalendarIcon}
                label="Join Date"
                value={formatDate(user?.joinDate)}
              />
              <Divider />
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>Last Active</Text>
                <Text fontSize="sm">
                  {formatDateTime(user?.lastActive)}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )
}

export default Profile 