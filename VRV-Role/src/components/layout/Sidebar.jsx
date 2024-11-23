/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  Box,
  VStack,
  Flex,
  Text,
  Icon,
  Image,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import { 
  HomeIcon, 
  UserGroupIcon, 
  KeyIcon, 
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import { authService } from '../../services/authService'

function Sidebar() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const bgColor = useColorModeValue('vrv.500', 'gray.800')
  const borderColor = useColorModeValue('vrv.600', 'gray.700')
  const activeItemBg = useColorModeValue('vrv.600', 'gray.700')
  const hoverBg = useColorModeValue('vrv.400', 'gray.600')
  const secondaryTextColor = useColorModeValue('gray.100', 'gray.400')

  // Define all possible navigation items
  const allNavigation = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: HomeIcon,
      roles: ['Admin', 'Manager', 'Employee'] 
    },
    { 
      name: 'Users', 
      href: '/users', 
      icon: UserGroupIcon,
      roles: ['Admin', 'Manager']
    },
    { 
      name: 'Roles', 
      href: '/roles', 
      icon: KeyIcon,
      roles: ['Admin']
    },
    { 
      name: 'Analytics', 
      href: '/analytics', 
      icon: ChartBarIcon,
      roles: ['Admin', 'Manager']
    },
    { 
      name: 'Calendar', 
      href: '/calendar', 
      icon: CalendarIcon,
      roles: ['Admin', 'Manager', 'Employee']
    },
  ]

  // Filter navigation items based on user role
  const mainNavigation = allNavigation.filter(item => 
    item.roles.includes(user?.role)
  )

  const secondaryNavigation = [
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Cog6ToothIcon,
      roles: ['Admin', 'Manager', 'Employee']
    },
    { 
      name: 'Logout', 
      href: '#', 
      icon: ArrowLeftOnRectangleIcon,
      onClick: () => {
        authService.logout()
        navigate('/login')
      },
      roles: ['Admin', 'Manager', 'Employee']
    },
  ].filter(item => item.roles.includes(user?.role))

  const NavItem = ({ item, isSecondary = false }) => (
    item.onClick ? (
      <Box
        as="button"
        w="full"
        onClick={item.onClick}
        className="transition-all duration-200 ease-in-out"
      >
        <Flex
          align="center"
          px="4"
          py="3"
          mx="2"
          rounded="xl"
          transition="all 0.3s"
          _hover={{ bg: hoverBg }}
          opacity={isSecondary ? 0.8 : 1}
        >
          <Icon as={item.icon} boxSize="5" color="white" />
          <Text ml="3" fontSize="sm" fontWeight="medium" color="white">
            {item.name}
          </Text>
        </Flex>
      </Box>
    ) : (
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `w-full transition-all duration-200 ease-in-out`
        }
      >
        {({ isActive }) => (
          <Flex
            align="center"
            px="4"
            py="3"
            mx="2"
            rounded="xl"
            transition="all 0.3s"
            bg={isActive ? activeItemBg : 'transparent'}
            _hover={{ bg: hoverBg }}
            opacity={isSecondary ? 0.8 : 1}
          >
            <Icon as={item.icon} boxSize="5" color="white" />
            <Text ml="3" fontSize="sm" fontWeight="medium" color="white">
              {item.name}
            </Text>
          </Flex>
        )}
      </NavLink>
    )
  )

  return (
    <Box
      as="aside"
      w="64"
      bg={bgColor}
      color="white"
      display={{ base: 'none', md: 'block' }}
      borderRight="1px"
      borderColor={borderColor}
    >
      <Flex direction="column" h="full" py="5">
        {/* Logo Section */}
        <Flex align="center" px="6" mb="8">
          <Image 
            h="12" 
            w="auto" 
            src="/vite.svg" 
            alt="VRV Logo" 
            fallbackSrc="https://via.placeholder.com/36"
          />
          <Box ml="3">
            <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">
              VRV Admin
            </Text>
            <Text fontSize="xs" opacity="0.7">
              Role Management
            </Text>
          </Box>
        </Flex>

        {/* Main Navigation */}
        <VStack spacing="2" align="stretch" flex="1">
          <Text px="6" fontSize="xs" color={secondaryTextColor} textTransform="uppercase" letterSpacing="wider" mb="2">
            Main Menu
          </Text>
          {mainNavigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          {/* Secondary Navigation */}
          <Box mt="auto">
            <Divider my="4" borderColor={borderColor} opacity="0.3" />
            <Text px="6" fontSize="xs" color={secondaryTextColor} textTransform="uppercase" letterSpacing="wider" mb="2">
              System
            </Text>
            {secondaryNavigation.map((item) => (
              <NavItem key={item.name} item={item} isSecondary />
            ))}
          </Box>
        </VStack>

        {/* User Section */}
        <Box px="4" mt="6">
          <Flex
            p="3"
            rounded="xl"
            bg={activeItemBg}
            align="center"
            cursor="pointer"
            _hover={{ bg: hoverBg }}
            transition="all 0.3s"
          >
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
            >
              {user?.name?.charAt(0) || 'A'}
            </Box>
            <Box ml="3" flex="1">
              <Text fontSize="sm" fontWeight="medium">{user?.name || 'Admin User'}</Text>
              <Text fontSize="xs" opacity="0.7">{user?.email || 'admin@vrv.com'}</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default Sidebar 