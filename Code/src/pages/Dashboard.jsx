import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Icon,
  Progress,
  Avatar,
  AvatarGroup,
  Badge,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import {
  UsersIcon,
  KeyIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import PropTypes from 'prop-types'

const activityData = [
  { name: '1', value: 40 },
  { name: '2', value: 30 },
  { name: '3', value: 45 },
  { name: '4', value: 35 },
  { name: '5', value: 55 },
  { name: '6', value: 40 },
  { name: '7', value: 60 },
]

const recentActivities = [
  {
    id: 1,
    user: 'Rajesh Kumar',
    action: 'changed project status from',
    target: 'Senior Developer',
    time: '2 hours ago',
    avatar: 'R',
    fromStatus: 'In Progress',
    toStatus: 'Completed',
    type: 'status'
  },
  {
    id: 2,
    user: 'Priya Sharma',
    action: 'created new project',
    target: 'Marketing Campaign',
    time: '4 hours ago',
    avatar: 'P',
    type: 'create'
  },
  {
    id: 3,
    user: 'Amit Patel',
    action: 'changed role from',
    target: 'Developer',
    time: '5 hours ago',
    avatar: 'A',
    fromStatus: 'Developer',
    toStatus: 'Team Lead',
    type: 'role'
  },
  {
    id: 4,
    user: 'Neha Gupta',
    action: 'created new project',
    target: 'Project Management',
    time: '6 hours ago',
    avatar: 'N',
    type: 'create'
  },
  {
    id: 5,
    user: 'Kiran Shah',
    action: 'added new user',
    target: 'John Doe',
    time: '7 hours ago',
    avatar: 'K',
    type: 'create'
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Weekly sprint planning with development team',
    time: '10:00 AM',
    duration: '1h',
    type: 'meeting',
    status: 'upcoming',
    location: 'Conference Room A',
    attendees: [
      { name: 'Rajesh Kumar', avatar: 'R', role: 'Team Lead' },
      { name: 'Priya Sharma', avatar: 'P', role: 'Developer' },
      { name: 'Amit Patel', avatar: 'A', role: 'Designer' },
      { name: 'Neha Gupta', avatar: 'N', role: 'Product Manager' },
      { name: 'Kiran Shah', avatar: 'K', role: 'Client' },
    ],
  },
  {
    id: 2,
    title: 'Project Review',
    description: 'Monthly project status review with stakeholders',
    time: '2:30 PM',
    duration: '1.5h',
    type: 'review',
    status: 'upcoming',
    location: 'Virtual Meeting',
    attendees: [
      { name: 'Suresh Menon', avatar: 'S', role: 'Manager' },
      { name: 'Kiran Shah', avatar: 'K', role: 'Client' },
      { name: 'Meera Verma', avatar: 'M', role: 'Team Lead' },
    ],
  },
]

const timelineData = [
  {
    id: 1,
    title: 'New Policy Released',
    description: 'Updated security protocols are now in effect',
    time: '2 hours ago',
    type: 'policy',
    icon: ShieldCheckIcon,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Department Restructure',
    description: 'IT department has been reorganized',
    time: '5 hours ago',
    type: 'department',
    icon: BuildingOfficeIcon,
    color: 'purple'
  },
  {
    id: 3,
    title: 'System Maintenance',
    description: 'Successfully completed system updates',
    time: '1 day ago',
    type: 'system',
    icon: Cog6ToothIcon,
    color: 'green'
  },
  {
    id: 4,
    title: 'New Team Members',
    description: '3 new employees joined the organization',
    time: '2 days ago',
    type: 'team',
    icon: UserGroupIcon,
    color: 'orange'
  }
]

const TimelineRoot = ({ children, ...props }) => (
  <VStack align="stretch" spacing={0} {...props}>
    {children}
  </VStack>
)

const TimelineItem = ({ children, isLast }) => (
  <Box position="relative" pb={isLast ? 0 : 4}>
    {children}
  </Box>
)

const TimelineConnector = ({ children }) => (
  <Box
    position="absolute"
    left="20px"
    top="40px"
    bottom="-4px"
    width="2px"
    bg="gray.200"
    _dark={{ bg: 'gray.700' }}
  >
    <Box
      position="absolute"
      top="-40px"
      left="-25px"
      bg="white"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      rounded="full"
      p="2"
      border="2px solid"
      borderColor="gray.200"
    >
      {children}
    </Box>
  </Box>
)

const TimelineContent = ({ children, py = 0 }) => (
  <Box pl="48px" py={py}>{children}</Box>
)

function StatCard({ title, stat, icon, trend, helpText, color }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const iconBg = useColorModeValue(`${color}.100`, `${color}.900`)
  const iconColor = useColorModeValue(`${color}.500`, `${color}.200`)

  return (
    <Card bg={bgColor} border="1px solid" borderColor="#304945">
      <CardBody>
        <Stack spacing={4}>
          <HStack spacing={4}>
            <Box p={3} bg={iconBg} borderRadius="lg">
              <Icon as={icon} boxSize={6} color={iconColor} />
            </Box>
            <Box flex={1}>
              <Text fontSize="sm" color="gray.500">{title}</Text>
              <Text fontSize="2xl" fontWeight="bold">{stat}</Text>
            </Box>
          </HStack>
          <HStack fontSize="sm" spacing={2}>
            <Icon 
              as={trend >= 0 ? ArrowUpIcon : ArrowDownIcon}
              color={trend >= 0 ? 'green.500' : 'red.500'}
              boxSize={4}
            />
            <Text color={trend >= 0 ? 'green.500' : 'red.500'}>
              {Math.abs(trend)}%
            </Text>
            <Text color="gray.500">{helpText}</Text>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  trend: PropTypes.number.isRequired,
  helpText: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

function ActivityFeed() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Card bg={bgColor} border="1px solid" borderColor="#304945" minH="400px">
      <CardBody>
        <Text fontSize="lg" fontWeight="medium" mb={6}>Recent Activity</Text>
        <TimelineRoot>
          {recentActivities.map((activity, index) => (
            <TimelineItem 
              key={activity.id}
              isLast={index === recentActivities.length - 1}
            >
              <TimelineConnector>
                <Avatar
                  name={activity.user}
                  size="sm"
                  bg="vrv.500"
                  color="white"
                />
              </TimelineConnector>
              <TimelineContent py={3}>
                <Box pl={3}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">
                      <Text as="span" fontWeight="semibold">{activity.user}</Text>
                      {' '}{activity.action}{' '}
                      {activity.type === 'status' ? (
                        <>
                          <Badge variant="subtle" colorScheme="orange" mr={1}>
                            {activity.fromStatus}
                          </Badge>
                          to
                          <Badge variant="subtle" colorScheme="green" ml={1}>
                            {activity.toStatus}
                          </Badge>
                        </>
                      ) : activity.type === 'role' ? (
                        <>
                          <Badge variant="subtle" colorScheme="purple" mr={1}>
                            {activity.fromStatus}
                          </Badge>
                          to
                          <Badge variant="subtle" colorScheme="blue" ml={1}>
                            {activity.toStatus}
                          </Badge>
                        </>
                      ) : (
                        <Text 
                          as="span" 
                          color="vrv.500" 
                          _dark={{ color: 'vrv.200' }}
                          fontWeight="medium"
                        >
                          {activity.target}
                        </Text>
                      )}
                    </Text>
                  </HStack>
                  <HStack fontSize="xs" color={textColor} spacing={2}>
                    <ClockIcon className="h-3 w-3" />
                    <Text>{activity.time}</Text>
                  </HStack>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineRoot>
      </CardBody>
    </Card>
  )
}

TimelineRoot.propTypes = {
  children: PropTypes.node.isRequired,
}

TimelineItem.propTypes = {
  children: PropTypes.node.isRequired,
  isLast: PropTypes.bool,
}

TimelineConnector.propTypes = {
  children: PropTypes.node.isRequired,
}

TimelineContent.propTypes = {
  children: PropTypes.node.isRequired,
  py: PropTypes.number,
}

function EventsCard() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting':
        return UsersIcon
      case 'review':
        return ChartBarIcon
      default:
        return CalendarIcon
    }
  }

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'green'
      case 'upcoming':
        return 'blue'
      case 'completed':
        return 'gray'
      default:
        return 'gray'
    }
  }

  return (
    <Card bg={bgColor} border="1px solid" borderColor="#304945">
      <CardBody>
        <HStack justify="space-between" mb={6}>
          <Text fontSize="lg" fontWeight="medium">Today&apos;s Events</Text>
          <Badge colorScheme="vrv" variant="subtle">
            {upcomingEvents.length} Events
          </Badge>
        </HStack>
        <VStack spacing={4} align="stretch">
          {upcomingEvents.map((event) => (
            <Box
              key={event.id}
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ bg: hoverBg }}
              transition="all 0.2s"
            >
              <HStack spacing={4} align="start">
                <Box
                  p={2}
                  bg="vrv.50"
                  color="vrv.500"
                  rounded="lg"
                  _dark={{
                    bg: 'gray.700',
                    color: 'vrv.200',
                  }}
                >
                  <Icon as={getEventTypeIcon(event.type)} boxSize={5} />
                </Box>
                <Box flex={1}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontWeight="semibold">{event.title}</Text>
                    <Badge 
                      colorScheme={getEventStatusColor(event.status)}
                      variant="subtle"
                    >
                      {event.status}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color={textColor} mb={2}>
                    {event.description}
                  </Text>
                  <HStack fontSize="sm" color={textColor} mb={3} spacing={4}>
                    <HStack>
                      <ClockIcon className="h-4 w-4" />
                      <Text>{event.time}</Text>
                      <Text color="gray.500">({event.duration})</Text>
                    </HStack>
                    <HStack>
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <Text>{event.location}</Text>
                    </HStack>
                  </HStack>
                  <Box>
                    <Text fontSize="sm" color={textColor} mb={2}>
                      Attendees
                    </Text>
                    <HStack spacing={6}>
                      <AvatarGroup size="sm" max={4}>
                        {event.attendees.map((attendee, index) => (
                          <Tooltip 
                            key={index} 
                            label={`${attendee.name} (${attendee.role})`}
                            hasArrow
                          >
                            <Avatar
                              name={attendee.name}
                              bg="vrv.500"
                              color="white"
                            />
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                      {event.attendees.length > 4 && (
                        <Text fontSize="sm" color={textColor}>
                          +{event.attendees.length - 4} more
                        </Text>
                      )}
                    </HStack>
                  </Box>
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  )
}

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box p={8}>
      <PageHeader
        title={`Welcome back, ${user?.name || 'Admin'}`}
        description="Here's what's happening with your projects today"
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <Tooltip label="Total number of system users" hasArrow>
          <Box>
            <StatCard
              title="Total Users"
              stat="125"
              icon={UsersIcon}
              trend={12}
              helpText="vs last month"
              color="blue"
            />
          </Box>
        </Tooltip>
        
        <Tooltip label="Active roles in the system" hasArrow>
          <Box>
            <StatCard
              title="Active Roles"
              stat="8"
              icon={KeyIcon}
              trend={-5}
              helpText="vs last month"
              color="purple"
            />
          </Box>
        </Tooltip>
        
        <Tooltip label="Total departments" hasArrow>
          <Box>
            <StatCard
              title="Departments"
              stat="12"
              icon={ChartBarIcon}
              trend={8}
              helpText="vs last month"
              color="green"
            />
          </Box>
        </Tooltip>
        
        <Tooltip label="Scheduled events" hasArrow>
          <Box>
            <StatCard
              title="Events"
              stat="28"
              icon={CalendarIcon}
              trend={15}
              helpText="vs last month"
              color="orange"
            />
          </Box>
        </Tooltip>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        <Card bg={bgColor} border="1px solid" borderColor="#304945">
          <CardBody>
            <HStack justify="space-between" mb={4}>
              <Box>
                <Text fontSize="lg" fontWeight="medium">System Activity</Text>
                <Text fontSize="sm" color="gray.500">Last 7 days</Text>
              </Box>
              <Icon as={ArrowTrendingUpIcon} boxSize={5} color="green.500" />
            </HStack>
            <Box h="200px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#304945" 
                    strokeWidth={2}
                    dot={{
                      stroke: '#304945',
                      strokeWidth: 2,
                      fill: 'white',
                      r: 4,
                    }}
                    activeDot={{
                      stroke: '#304945',
                      strokeWidth: 2,
                      fill: '#304945',
                      r: 6,
                    }}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        <Card bg={bgColor} border="1px solid" borderColor="#304945">
          <CardBody>
            <Text fontSize="md" fontWeight="medium" mb={4}>Recent Timeline</Text>
            <VStack spacing={4} align="stretch">
              {timelineData.map((item, index) => (
                <Box key={item.id} position="relative">
                  {index !== timelineData.length - 1 && (
                    <Box
                      position="absolute"
                      left="20px"
                      top="40px"
                      bottom="-20px"
                      width="2px"
                      bg={`${item.color}.100`}
                      zIndex={1}
                    />
                  )}
                  <HStack spacing={4} align="flex-start">
                    <Box
                      p={2}
                      bg={`${item.color}.100`}
                      color={`${item.color}.500`}
                      rounded="full"
                      position="relative"
                      zIndex={2}
                    >
                      <Icon as={item.icon} boxSize={6} />
                    </Box>
                    <Box flex={1}>
                      <HStack justify="space-between" mb={1}>
                        <Text fontWeight="medium">{item.title}</Text>
                        <Text fontSize="sm" color="gray.500">{item.time}</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        {item.description}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <ActivityFeed />
        <EventsCard />
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard 