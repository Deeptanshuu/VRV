import { useState } from 'react'
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
  useColorMode,
  useColorModeValue,
  Tooltip,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Stack,
  Circle,
} from '@chakra-ui/react'
import { BellIcon, MoonIcon, SunIcon, UserIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../../services/authService'

function Header() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const { colorMode, toggleColorMode } = useColorMode()
  
  // Add these color mode values
  const bgColor = useColorModeValue('#304945', '#243634')
  const borderColor = useColorModeValue('#3d5b56', '#243634')
  const activeItemBg = useColorModeValue('#405d58', '#3d5b56')
  const hoverBg = useColorModeValue('#405d58', '#3d5b56')
  const notificationBg = useColorModeValue('white', 'gray.800')
  
  // Add these menu-specific colors
  const menuBg = useColorModeValue('white', 'gray.800')
  const menuBorderColor = useColorModeValue('gray.200', 'gray.700')
  const menuItemBg = useColorModeValue('white', 'gray.800')
  const menuItemHoverBg = useColorModeValue('gray.50', 'gray.700')
  const menuTextColor = useColorModeValue('gray.700', 'gray.200')
  const iconBg = useColorModeValue('vrv.50', 'whiteAlpha.100')
  const iconColor = useColorModeValue('vrv.500', 'whiteAlpha.900')

  // Add handleLogout function
  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New User Added',
      description: 'John Doe has been added to the system',
      time: '2 min ago',
      isRead: false,
      type: 'user'
    },
    {
      id: 2,
      title: 'Role Updated',
      description: 'Manager role permissions have been modified',
      time: '1 hour ago',
      isRead: false,
      type: 'role'
    },
    {
      id: 3,
      title: 'System Update',
      description: 'System maintenance scheduled for tomorrow',
      time: '2 hours ago',
      isRead: true,
      type: 'system'
    }
  ])

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.isRead).length

  // Mark notification as read
  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  const hoverBgColor = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box bg={bgColor} px={4} borderBottom="1px" borderColor={borderColor}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text 
          fontSize={{ base: "lg", md: "2xl" }} 
          fontWeight="semibold" 
          color="white"
          pl={{ base: 10, md: 0 }}
          pt={{ base: 2, md: 0 }}
        >
          Dashboard
        </Text>

        <HStack spacing={{ base: 2, md: 4 }}>
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              size={{ base: 'sm', md: 'md' }}
              variant="ghost"
              icon={colorMode === 'light' ? 
                <MoonIcon className="h-4 w-4 md:h-5 md:w-5" /> : 
                <SunIcon className="h-4 w-4 md:h-5 md:w-5" />
              }
              onClick={toggleColorMode}
              aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
              color="white"
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>

          <Box position="relative">
            <Popover>
              <PopoverTrigger>
                <Box position="relative">
                  <IconButton
                    size={{ base: 'sm', md: 'md' }}
                    variant="ghost"
                    icon={<BellIcon className="h-5 w-5 md:h-6 md:w-6" />}
                    aria-label="Notifications"
                    color="white"
                    _hover={{ bg: hoverBg }}
                  />
                  {unreadCount > 0 && (
                    <Circle
                      size="5"
                      bg="red.500"
                      color="white"
                      position="absolute"
                      top={0}
                      right={0}
                      transform="translate(25%, -25%)"
                      fontSize="xs"
                      fontWeight="bold"
                    >
                      {unreadCount}
                    </Circle>
                  )}
                </Box>
              </PopoverTrigger>
              <PopoverContent
                w="350px"
                bg={notificationBg}
                border="1px solid"
                borderColor="#304945"
                _focus={{ boxShadow: 'none' }}
              >
                <PopoverArrow />
                <PopoverHeader borderBottomWidth="1px" py={4}>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="medium">Notifications</Text>
                    <HStack spacing={2}>
                      <Text
                        fontSize="sm"
                        color="vrv.500"
                        cursor="pointer"
                        onClick={markAllAsRead}
                        _hover={{ textDecoration: 'underline' }}
                      >
                        Mark all as read
                      </Text>
                      <Text
                        fontSize="sm"
                        color="red.500"
                        cursor="pointer"
                        onClick={clearNotifications}
                        _hover={{ textDecoration: 'underline' }}
                      >
                        Clear all
                      </Text>
                    </HStack>
                  </Flex>
                </PopoverHeader>
                <PopoverBody p={0}>
                  <Stack spacing={0} maxH="400px" overflowY="auto">
                    {notifications.length === 0 ? (
                      <Box p={4} textAlign="center">
                        <Text color="gray.500">No notifications</Text>
                      </Box>
                    ) : (
                      notifications.map((notification) => (
                        <Box
                          key={notification.id}
                          p={4}
                          bg={notification.isRead ? 'transparent' : 'vrv.50'}
                          _hover={{ bg: hoverBgColor }}
                          cursor="pointer"
                          onClick={() => handleNotificationClick(notification.id)}
                          borderBottomWidth="1px"
                          borderColor="inherit"
                        >
                          <Text fontWeight="medium" fontSize="sm">
                            {notification.title}
                          </Text>
                          <Text fontSize="sm" color="gray.500" mt={1}>
                            {notification.description}
                          </Text>
                          <Text fontSize="xs" color="gray.400" mt={1}>
                            {notification.time}
                          </Text>
                        </Box>
                      ))
                    )}
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>

          <Box w="1px" h="8" bg={borderColor} opacity="0.3" display={{ base: 'none', md: 'block' }} />

          <Menu>
            <MenuButton
              as={Flex}
              bg={activeItemBg}
              p={{ base: "1", md: "2" }}
              rounded="lg"
              align="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: hoverBg }}
            >
              <Flex align="center" minW={{ base: "auto", md: "200px" }}>
                <Box
                  w={{ base: "7", md: "8" }}
                  h={{ base: "7", md: "8" }}
                  rounded="lg"
                  bg={hoverBg}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="bold"
                  color="white"
                >
                  {user?.name?.charAt(0) || 'A'}
                </Box>
                <Box ml="3" flex="1" display={{ base: 'none', md: 'block' }}>
                  <Text fontSize="sm" fontWeight="medium" color="white" noOfLines={1}>
                    {user?.name || 'Admin User'}
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.800" noOfLines={1}>
                    {user?.email || 'admin@vrv.com'}
                  </Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList
              bg={menuBg}
              borderColor={menuBorderColor}
              shadow="lg"
              py={2}
              overflow="hidden"
            >
              <MenuItem
                bg={menuItemBg}
                _hover={{ bg: menuItemHoverBg }}
                color={menuTextColor}
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 3 }}
                fontSize="sm"
                fontWeight="medium"
                transition="all 0.2s"
              >
                <Link to="/profile">
                  <HStack spacing={{ base: 2, md: 3 }}>
                    <Box
                      p={{ base: 1.5, md: 2 }}
                      bg={iconBg}
                      rounded="md"
                      color={iconColor}
                    >
                      <UserIcon className="h-4 w-4" />
                    </Box>
                    <Text>Profile</Text>
                  </HStack>
                </Link>
              </MenuItem>

              <MenuItem
                bg={menuItemBg}
                _hover={{ bg: menuItemHoverBg }}
                color={menuTextColor}
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 3 }}
                fontSize="sm"
                fontWeight="medium"
                transition="all 0.2s"
              >
                <Link to="/settings">
                  <HStack spacing={{ base: 2, md: 3 }}>
                    <Box
                      p={{ base: 1.5, md: 2 }}
                      bg={iconBg}
                      rounded="md"
                      color={iconColor}
                    >
                      <Cog6ToothIcon className="h-4 w-4" />
                    </Box>
                    <Text>Settings</Text>
                  </HStack>
                </Link>
              </MenuItem>

              <Box px={3} py={2}>
                <Divider borderColor={menuBorderColor} />
              </Box>

              <MenuItem
                bg={menuItemBg}
                _hover={{ 
                  bg: useColorModeValue('red.50', 'red.900'),
                  color: 'red.500',
                }}
                color={menuTextColor}
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 3 }}
                fontSize="sm"
                fontWeight="medium"
                transition="all 0.2s"
                onClick={handleLogout}
              >
                <HStack spacing={{ base: 2, md: 3 }}>
                  <Box
                    p={{ base: 1.5, md: 2 }}
                    bg={useColorModeValue('red.50', 'whiteAlpha.100')}
                    rounded="md"
                    color={useColorModeValue('red.500', 'red.300')}
                  >
                    <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  </Box>
                  <Text>Sign out</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header 