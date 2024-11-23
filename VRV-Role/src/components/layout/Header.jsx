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
  Badge,
  HStack,
  useColorMode,
  useColorModeValue,
  Tooltip,
  Divider,
} from '@chakra-ui/react'
import { BellIcon, MoonIcon, SunIcon, UserIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../../services/authService'

function Header() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const [notifications] = useState([])
  const { colorMode, toggleColorMode } = useColorMode()
  
  // Updated color mode values
  const bgColor = useColorModeValue('#304945', '#243634')
  const borderColor = useColorModeValue('#3d5b56', '#243634')
  const activeItemBg = useColorModeValue('#405d58', '#3d5b56')
  const hoverBg = useColorModeValue('#405d58', '#3d5b56')
  
  // Menu specific colors
  const menuBg = useColorModeValue('white', 'gray.800')
  const menuBorderColor = useColorModeValue('gray.200', 'gray.700')
  const menuItemBg = useColorModeValue('white', 'gray.800')
  const menuItemHoverBg = useColorModeValue('gray.50', 'gray.700')
  const menuTextColor = useColorModeValue('gray.700', 'gray.200')
  const iconBg = useColorModeValue('vrv.50', 'whiteAlpha.100')
  const iconColor = useColorModeValue('vrv.500', 'whiteAlpha.900')

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <Box bg={bgColor} px={4} borderBottom="1px" borderColor={borderColor}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="white">
          Dashboard
        </Text>

        <HStack spacing={4}>
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              variant="ghost"
              icon={colorMode === 'light' ? 
                <MoonIcon className="h-5 w-5" /> : 
                <SunIcon className="h-5 w-5" />
              }
              onClick={toggleColorMode}
              aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
              color="white"
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>

          <Box position="relative">
            <IconButton
              variant="ghost"
              icon={<BellIcon className="h-6 w-6" />}
              aria-label="Notifications"
              color="white"
              _hover={{ bg: hoverBg }}
            />
            {notifications.length > 0 && (
              <Badge
                position="absolute"
                top={1}
                right={1}
                colorScheme="red"
                variant="solid"
                borderRadius="full"
                boxSize={2}
              />
            )}
          </Box>

          <Box w="1px" h="8" bg={borderColor} opacity="0.3" />

          <Menu>
            <MenuButton
              as={Flex}
              bg={activeItemBg}
              p="2"
              rounded="lg"
              align="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: hoverBg }}
            >
              <Flex align="center" minW={{ base: "auto", md: "200px" }}>
                <Box
                  w="8"
                  h="8"
                  rounded="lg"
                  bg={hoverBg}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="sm"
                  fontWeight="bold"
                  color="white"
                >
                  {user?.name?.charAt(0) || 'A'}
                </Box>
                <Box ml="3" flex="1">
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
                px={4}
                py={3}
                fontSize="sm"
                fontWeight="medium"
                transition="all 0.2s"
              >
                <Link to="/profile">
                  <HStack spacing={3}>
                    <Box
                    p={2}
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
                px={4}
                py={3}
                fontSize="sm"
                fontWeight="medium"
                transition="all 0.2s"
              >
                <Link to="/settings">
                  <HStack spacing={3}>
                    <Box
                    p={2}
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
                px={4}
                py={3}
                fontSize="sm"
                fontWeight="medium"
                transition="all 0.2s"
                onClick={handleLogout}
              >
                <HStack spacing={3}>
                  <Box
                    p={2}
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