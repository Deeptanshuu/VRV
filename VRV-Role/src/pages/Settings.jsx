import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Button,
  useColorMode,
  useColorModeValue,
  Divider,
  HStack,
  Avatar,
  IconButton,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CameraIcon } from '@heroicons/react/24/outline'
import { authService } from '../services/authService'

function Settings() {
  const user = authService.getCurrentUser()
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    phone: user?.phone || '',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    securityAlerts: true,
    updateNotifications: false,
  })

  const [errors, setErrors] = useState({})

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  const validateProfileData = () => {
    const newErrors = {}
    
    // Name validation
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (profileData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation (optional)
    if (profileData.phone) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/
      if (!phoneRegex.test(profileData.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    // Department validation
    if (!profileData.department) {
      newErrors.department = 'Please select a department'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileUpdate = () => {
    if (validateProfileData()) {
      // In a real app, this would call an API
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
      })
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please check the form for errors',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleNotificationUpdate = () => {
    toast({
      title: 'Notification Settings Updated',
      description: 'Your notification preferences have been saved.',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>Settings</Heading>
      
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Profile Settings */}
        <Card bg={cardBg} borderColor={borderColor} variant="outline">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md">Profile Settings</Heading>
              <HStack spacing={4}>
                <Avatar
                  size="xl"
                  name={user?.name}
                  bg="vrv.500"
                />
                <IconButton
                  icon={<CameraIcon className="h-5 w-5" />}
                  aria-label="Change profile picture"
                  variant="outline"
                  colorScheme="vrv"
                />
              </HStack>
              
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  onBlur={validateProfileData}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  onBlur={validateProfileData}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={!!errors.department} isRequired>
                <FormLabel>Department</FormLabel>
                <Select
                  name="department"
                  value={profileData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </Select>
                <FormErrorMessage>{errors.department}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  onBlur={validateProfileData}
                  placeholder="Optional"
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              <Button colorScheme="vrv" onClick={handleProfileUpdate}>
                Save Profile
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Preferences */}
        <VStack spacing={6}>
          {/* Appearance Settings */}
          <Card bg={cardBg} borderColor={borderColor} variant="outline" w="full">
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Heading size="md">Appearance</Heading>
                <Text color={textColor}>
                  Customize how VRV Admin looks on your device
                </Text>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Dark Mode
                  </FormLabel>
                  <Switch
                    isChecked={colorMode === 'dark'}
                    onChange={toggleColorMode}
                    colorScheme="vrv"
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Notification Settings */}
          <Card bg={cardBg} borderColor={borderColor} variant="outline" w="full">
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Heading size="md">Notifications</Heading>
                <Text color={textColor}>
                  Choose what notifications you want to receive
                </Text>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Email Notifications
                  </FormLabel>
                  <Switch
                    isChecked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: e.target.checked
                    })}
                    colorScheme="vrv"
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Push Notifications
                  </FormLabel>
                  <Switch
                    isChecked={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      pushNotifications: e.target.checked
                    })}
                    colorScheme="vrv"
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Security Alerts
                  </FormLabel>
                  <Switch
                    isChecked={notificationSettings.securityAlerts}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      securityAlerts: e.target.checked
                    })}
                    colorScheme="vrv"
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">
                    Product Updates
                  </FormLabel>
                  <Switch
                    isChecked={notificationSettings.updateNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      updateNotifications: e.target.checked
                    })}
                    colorScheme="vrv"
                  />
                </FormControl>

                <Button colorScheme="vrv" onClick={handleNotificationUpdate}>
                  Save Notification Settings
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </SimpleGrid>
    </Box>
  )
}

export default Settings 