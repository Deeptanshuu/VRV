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
} from '@chakra-ui/react'
import { BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

function Header() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const [notifications] = useState([])
  const { colorMode, toggleColorMode } = useColorMode()
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.800')
  const activeItemBg = useColorModeValue('vrv.500', 'gray.700')
  const hoverBg = useColorModeValue('vrv.400', 'gray.600')

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <Box bg={bgColor} px={4} borderBottom="1px" borderColor={borderColor}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="vrv.500">
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
            />
          </Tooltip>

          <Box position="relative">
            <IconButton
              variant="ghost"
              icon={<BellIcon className="h-6 w-6" />}
              aria-label="Notifications"
              color="gray.400"
              _hover={{ color: 'vrv.500' }}
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

          <Box w="1px" h="8" bg={borderColor} />

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
              <Flex align="center" minW="200px">
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
              border="1px"
              borderColor={borderColor}
              shadow="lg"
              py={2}
              mt={1}
            >
              <MenuItem
                py={2}
                px={4}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                Profile
              </MenuItem>
              <MenuItem
                py={2}
                px={4}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                Settings
              </MenuItem>
              <Box px={2} my={1}>
                <Box h="1px" bg={borderColor} />
              </Box>
              <MenuItem
                py={2}
                px={4}
                color="red.500"
                _hover={{ bg: useColorModeValue('red.50', 'red.900') }}
                onClick={handleLogout}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header 