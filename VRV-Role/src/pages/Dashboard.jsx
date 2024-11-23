import { 
  Box, 
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { UserGroupIcon, KeyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

function StatsCard({ title, stat, icon, helpText }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const headingColor = useColorModeValue('gray.900', 'white')
  const iconBg = useColorModeValue('vrv.50', 'vrv.900')
  const iconColor = useColorModeValue('vrv.500', 'vrv.200')

  return (
    <Card
      bg={cardBg}
      shadow="sm"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <CardBody>
        <Flex alignItems="center">
          <Box p={4} bg={iconBg} borderRadius="lg">
            <Icon as={icon} boxSize={6} color={iconColor} />
          </Box>
          <Box ml={4}>
            <Text color={textColor} fontSize="sm" fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
              {stat}
            </Text>
            {helpText && (
              <Text fontSize="sm" color={textColor}>
                {helpText}
              </Text>
            )}
          </Box>
        </Flex>
      </CardBody>
    </Card>
  )
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  helpText: PropTypes.string,
}

function Dashboard() {
  const headingColor = useColorModeValue('gray.900', 'white')
  const user = JSON.parse(localStorage.getItem('user'))

  const stats = [
    { 
      title: 'Total Users', 
      stat: '12', 
      icon: UserGroupIcon,
      helpText: '3 active today'
    },
    { 
      title: 'Roles', 
      stat: '4', 
      icon: KeyIcon,
      helpText: 'Last updated 2h ago'
    },
    { 
      title: 'Active Permissions', 
      stat: '24', 
      icon: ShieldCheckIcon,
      helpText: 'Across all roles'
    },
  ]

  return (
    <Box p={8}>
      <Heading
        mb={8}
        fontSize="2xl"
        fontWeight="semibold"
        color={headingColor}
      >
        Welcome, {user?.name || 'Admin'}
      </Heading>
      
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
      >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </SimpleGrid>

      {/* Additional dashboard content can go here */}
      <Box mt={12}>
        <Card
          bg={useColorModeValue('white', 'gray.800')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          shadow="sm"
        >
          <CardBody>
            <Heading
              size="md"
              mb={4}
              color={headingColor}
            >
              Quick Overview
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              Welcome to the VRV Role Management System. This dashboard provides you with a quick overview of your system's status and recent activities.
            </Text>
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}

export default Dashboard 