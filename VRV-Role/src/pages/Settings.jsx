import {
  Box,
  Card,
  CardBody,
  Stack,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  HStack,
  Divider,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import { authService } from '../services/authService'

function Settings() {
  const { colorMode, toggleColorMode } = useColorMode()
  const user = authService.getCurrentUser()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  })

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would call an API
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <Box p={8}>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <Stack spacing={6}>
        {/* Profile Settings */}
        <Card bg={bgColor} borderColor={borderColor}>
          <CardBody>
            <Text fontSize="lg" fontWeight="medium" mb={6}>
              Profile Settings
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="start">
                <HStack spacing={6} width="full">
                  <Avatar
                    size="xl"
                    name={user?.name}
                    bg="vrv.500"
                  />
                  <Box>
                    <Text fontWeight="medium">Profile Photo</Text>
                    <Text fontSize="sm" color={textColor} mb={2}>
                      This will be displayed on your profile
                    </Text>
                    <Button size="sm" colorScheme="vrv">
                      Change Photo
                    </Button>
                  </Box>
                </HStack>

                <Divider />

                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                  />
                </FormControl>

                <Button type="submit" colorScheme="vrv">
                  Save Changes
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>

        {/* Appearance Settings */}
        <Card bg={bgColor} borderColor={borderColor}>
          <CardBody>
            <Text fontSize="lg" fontWeight="medium" mb={6}>
              Appearance
            </Text>
            <Stack spacing={4}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Text fontWeight="medium">Dark Mode</Text>
                  <Text fontSize="sm" color={textColor}>
                    Toggle dark mode on or off
                  </Text>
                </Box>
                <Switch
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                  colorScheme="vrv"
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>

        {/* Security Settings */}
        <Card bg={bgColor} borderColor={borderColor}>
          <CardBody>
            <Text fontSize="lg" fontWeight="medium" mb={6}>
              Security
            </Text>
            <VStack spacing={4} align="start">
              <Button variant="outline" colorScheme="vrv">
                Change Password
              </Button>
              <Button variant="outline" colorScheme="red">
                Delete Account
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Stack>
    </Box>
  )
}

export default Settings 