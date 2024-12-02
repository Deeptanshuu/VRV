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
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react'
import { 
  HomeIcon, 
  UserGroupIcon, 
  KeyIcon, 
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  CalendarIcon,
  Bars3Icon,
  BuildingOfficeIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { authService } from '../../services/authService'
import { useState } from 'react'

function Sidebar() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const bgColor = useColorModeValue('#304945', '#243634')
  const borderColor = useColorModeValue('white', 'gray.700')
  const activeItemBg = useColorModeValue('#405d58', '#3d5b56')
  const hoverBg = useColorModeValue('#405d58', '#3d5b56')
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
    { 
      name: 'Departments', 
      href: '/departments', 
      icon: BuildingOfficeIcon,
      roles: ['Admin', 'Manager']
    },
    { 
      name: 'Profile', 
      href: '/profile', 
      icon: UserIcon,
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

  const SidebarContent = ({ onClose: onDrawerClose = () => {} }) => (
    <Box
      bg={bgColor}
      color="white"
      h="full"
      py="5"
      position="relative"
      transition="all 0.3s ease-in-out"
      w={isCollapsed ? '20' : '64'}
    >
      {/* Collapse Toggle Button */}
      <IconButton
        icon={isCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        position="absolute"
        right="-5"
        top="50%"
        transform="translateY(-50%)"
        size="md"
        rounded="full"
        border="1px solid"
        borderColor={bgColor}
        display={{ base: 'none', md: 'flex' }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand" : "Collapse"}
        zIndex="10"
        transition="all 0.2s ease-in-out"
        _hover={{
          transform: "translateY(-50%) scale(1.1)",
          boxShadow: "lg"
        }}
      />

      <Flex direction="column" h="full">
        {/* Logo Section */}
        <Flex align="center" px="6" mb="8" overflow="hidden" transition="all 0.3s ease-in-out">
          <Image 
            h="12" 
            w="auto" 
            src="/vite.svg" 
            alt="VRV Logo" 
            fallbackSrc="https://via.placeholder.com/36"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
          />
          {!isCollapsed && (
            <Box ml="3">
              <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">
                VRV Security
              </Text>
              <Text fontSize="xs" opacity="0.7">
                Role Management System
              </Text>
            </Box>
          )}
        </Flex>

        {/* Main Navigation */}
        <VStack spacing="2" align="stretch" flex="1">
          {!isCollapsed && (
            <Text px="6" fontSize="xs" color={secondaryTextColor} textTransform="uppercase" letterSpacing="wider" mb="2">
              Main Menu
            </Text>
          )}
          {mainNavigation.map((item) => (
            <NavItem 
              key={item.name} 
              item={item} 
              onClose={onDrawerClose}
              activeItemBg={activeItemBg}
              hoverBg={hoverBg}
              isCollapsed={isCollapsed}
            />
          ))}

          {/* Secondary Navigation */}
          <Box mt="auto">
            <Divider my="4" borderColor={borderColor} opacity="0.3" />
            {!isCollapsed && (
              <Text px="6" fontSize="xs" color={secondaryTextColor} textTransform="uppercase" letterSpacing="wider" mb="2">
                System
              </Text>
            )}
            {secondaryNavigation.map((item) => (
              <NavItem 
                key={item.name} 
                item={item} 
                isSecondary 
                onClose={onDrawerClose}
                activeItemBg={activeItemBg}
                hoverBg={hoverBg}
                isCollapsed={isCollapsed}
              />
            ))}
          </Box>
        </VStack>

        {/* User Section */}
        <Box px="4" mt="6">
          <Tooltip label={isCollapsed ? `${user?.name || 'Unknown User'}` : ''} placement="right">
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
                transition="all 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
              >
                {user?.name?.charAt(0) || '?'}
              </Box>
              {!isCollapsed && (
                <Box ml="3" flex="1">
                  <Text fontSize="sm" fontWeight="medium">{user?.name || 'Unknown'}</Text>
                  <Text fontSize="xs" opacity="0.7">{user?.email || 'no@email.com'}</Text>
                </Box>
              )}
            </Flex>
          </Tooltip>
        </Box>
      </Flex>
    </Box>
  )

  const NavItem = ({ item, isSecondary = false, onClose, activeItemBg, hoverBg, isCollapsed }) => {
    const isMobile = window.innerWidth < 768;

    const NavContent = (
      <Tooltip label={isCollapsed ? item.name : ''} placement="right">
        <Flex
          align="center"
          px="4"
          py="3"
          m={isCollapsed ? '3' : '0'}
          rounded="xl"
          transition="all 0.3s ease-in-out"
          _hover={{ bg: hoverBg }}
          opacity={isSecondary ? 0.8 : 1}
        >
          <Icon as={item.icon} boxSize="5" color="white" />
          {!isCollapsed && (
            <Text ml="3" fontSize="sm" fontWeight="medium" color="white">
              {item.name}
            </Text>
          )}
        </Flex>
      </Tooltip>
    );

    if (item.onClick) {
      return (
        <Box
          as="button"
          w="full"
          onClick={() => {
            item.onClick();
            onClose?.();
          }}
          className="transition-all duration-200 ease-in-out"
        >
          {NavContent}
        </Box>
      );
    }

    // Use regular anchor tag for mobile
    if (isMobile) {
      return (
        <Box
          as="a"
          href={item.href}
          w="full"
          className="transition-all duration-200 ease-in-out"
          onClick={() => {
            onClose?.();
          }}
        >
          {NavContent}
        </Box>
      );
    }

    // Use NavLink for desktop
    return (
      <NavLink
        to={item.href}
        className="w-full transition-all duration-200 ease-in-out"
        onClick={() => {
          onClose?.();
        }}
      >
        {({ isActive }) => (
          <Box 
            bg={isActive ? activeItemBg : 'transparent'}
            position="relative"
            _before={isActive ? {
              content: '""',
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '70%',
              bg: 'white',
              borderRadius: 'full',
            } : {}}
          >
            {NavContent}
          </Box>
        )}
      </NavLink>
    );
  };

  // Mobile menu button
  const MobileMenuButton = () => (
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="ghost"
      position="fixed"
      top="4"
      left="4"
      zIndex={10}
      icon={<Bars3Icon className="h-6 w-6" />}
      aria-label="Open menu"
      color="white"
      _hover={{ bg: 'whiteAlpha.200' }}
    />
  )

  return (
    <>
      <MobileMenuButton />

      {/* Desktop sidebar */}
      <Box
        as="aside"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        w={isCollapsed ? '20' : '64'}
        display={{ base: 'none', md: 'block' }}
      >
        <SidebarContent />
      </Box>

      {/* Mobile drawer */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent 
            bg={bgColor}
            transition="transform 0.3s ease-out"
          >
            <Box position="relative" h="full">
              <DrawerCloseButton color="white" />
              <SidebarContent onClose={onClose} />
            </Box>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}

export default Sidebar 