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
  SimpleGrid,
  Icon,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import PageHeader from '../components/layout/PageHeader'
import { authService } from '../services/authService'
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'

function Settings() {
  const { colorMode, toggleColorMode } = useColorMode()
  const user = authService.getCurrentUser()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      updates: false,
    }
  })

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const toast = useToast()
  const fileInputRef = useRef(null)
  const [photoURL, setPhotoURL] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNotificationChange = (key) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 3000,
    })
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        status: 'error',
        duration: 3000,
      })
      return
    }
    toast({
      title: 'Password Updated',
      description: 'Your password has been successfully changed.',
      status: 'success',
      duration: 3000,
    })
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoURL(reader.result)
        toast({
          title: 'Photo Updated',
          description: 'Your profile photo has been updated successfully.',
          status: 'success',
          duration: 3000,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoURL(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast({
      title: 'Photo Removed',
      description: 'Your profile photo has been removed.',
      status: 'info',
      duration: 3000,
    })
  }

  return (
    <Box p={8}>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <Card bg={bgColor} border="1px solid" borderColor="#304945">
        <CardBody>
          <Tabs variant="soft-rounded" colorScheme="vrv">
            <TabList mb={6} gap={2}>
              <Tab gap={2}>
                <Icon as={UserIcon} boxSize={4} />
                <Text display={{ base: 'none', md: 'block' }}>Profile</Text>
              </Tab>
              <Tab gap={2}>
                <Icon as={ShieldCheckIcon} boxSize={4} />
                <Text display={{ base: 'none', md: 'block' }}>Security</Text>
              </Tab>
              <Tab gap={2}>
                <Icon as={BellIcon} boxSize={4} />
                <Text display={{ base: 'none', md: 'block' }}>Notifications</Text>
              </Tab>
              <Tab gap={2}>
                <Icon as={PaintBrushIcon} boxSize={4} />
                <Text display={{ base: 'none', md: 'block' }}>Appearance</Text>
              </Tab>
            </TabList>

            <TabPanels>
              {/* Profile Panel */}
              <TabPanel>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={6} align="start">
                    <HStack spacing={6} width="full">
                      <Avatar
                        size="xl"
                        name={user?.name}
                        src={photoURL}
                        bg="vrv.500"
                      />
                      <Box>
                        <Text fontWeight="medium">Profile Photo</Text>
                        <Text fontSize="sm" color={textColor} mb={2}>
                          This will be displayed on your profile
                        </Text>
                        <HStack>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                          />
                          <Button 
                            size="sm" 
                            colorScheme="vrv"
                            onClick={handleUploadClick}
                          >
                            Upload New
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={handleRemovePhoto}
                            isDisabled={!photoURL}
                          >
                            Remove
                          </Button>
                        </HStack>
                      </Box>
                    </HStack>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
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

                      <FormControl>
                        <FormLabel>Language</FormLabel>
                        <Select
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>

                    <Button type="submit" colorScheme="vrv">
                      Save Changes
                    </Button>
                  </VStack>
                </form>
              </TabPanel>

              {/* Security Panel */}
              <TabPanel>
                <form onSubmit={handlePasswordChange}>
                  <VStack spacing={6} align="start">
                    <Text fontSize="lg" fontWeight="medium">Change Password</Text>
                    
                    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6} w="full">
                      <FormControl>
                        <FormLabel>Current Password</FormLabel>
                        <InputGroup>
                          <Input
                            name="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                          />
                          <InputRightElement>
                            <Icon
                              as={showPassword ? EyeSlashIcon : EyeIcon}
                              cursor="pointer"
                              onClick={() => setShowPassword(!showPassword)}
                              boxSize={5}
                            />
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>

                      <FormControl>
                        <FormLabel>New Password</FormLabel>
                        <Input
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Enter new password"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm new password"
                        />
                      </FormControl>
                    </SimpleGrid>

                    <HStack spacing={4}>
                      <Button type="submit" colorScheme="vrv">
                        Update Password
                      </Button>
                      <Button variant="ghost" colorScheme="red">
                        Delete Account
                      </Button>
                    </HStack>
                  </VStack>
                </form>
              </TabPanel>

              {/* Notifications Panel */}
              <TabPanel>
                <VStack spacing={6} align="start">
                  <Text fontSize="lg" fontWeight="medium">Notification Preferences</Text>
                  
                  <Stack spacing={4} width="full">
                    <HStack justify="space-between">
                      <Box>
                        <Text fontWeight="medium">Email Notifications</Text>
                        <Text fontSize="sm" color={textColor}>
                          Receive notifications via email
                        </Text>
                      </Box>
                      <Switch
                        isChecked={formData.notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        colorScheme="vrv"
                      />
                    </HStack>

                    <Divider />

                    <HStack justify="space-between">
                      <Box>
                        <Text fontWeight="medium">Push Notifications</Text>
                        <Text fontSize="sm" color={textColor}>
                          Receive push notifications
                        </Text>
                      </Box>
                      <Switch
                        isChecked={formData.notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        colorScheme="vrv"
                      />
                    </HStack>

                    <Divider />

                    <HStack justify="space-between">
                      <Box>
                        <Text fontWeight="medium">Product Updates</Text>
                        <Text fontSize="sm" color={textColor}>
                          Receive updates about product changes
                        </Text>
                      </Box>
                      <Switch
                        isChecked={formData.notifications.updates}
                        onChange={() => handleNotificationChange('updates')}
                        colorScheme="vrv"
                      />
                    </HStack>
                  </Stack>
                </VStack>
              </TabPanel>

              {/* Appearance Panel */}
              <TabPanel>
                <VStack spacing={6} align="start">
                  <Text fontSize="lg" fontWeight="medium">Appearance Settings</Text>
                  
                  <Stack spacing={4} width="full">
                    <HStack justify="space-between">
                      <Box>
                        <Text fontWeight="medium">Dark Mode</Text>
                        <Text fontSize="sm" color={textColor}>
                          Toggle between light and dark themes
                        </Text>
                      </Box>
                      <Switch
                        isChecked={colorMode === 'dark'}
                        onChange={toggleColorMode}
                        colorScheme="vrv"
                      />
                    </HStack>
                  </Stack>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Settings 