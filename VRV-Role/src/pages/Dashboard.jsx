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
} from '@heroicons/react/24/outline'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
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
    action: 'created a new role',
    target: 'Senior Developer',
    time: '2 hours ago',
    avatar: 'R',
  },
  {
    id: 2,
    user: 'Priya Sharma',
    action: 'updated department',
    target: 'Marketing',
    time: '4 hours ago',
    avatar: 'P',
  },
  {
    id: 3,
    user: 'Amit Patel',
    action: 'added new user',
    target: 'Neha Gupta',
    time: '5 hours ago',
    avatar: 'A',
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    time: '10:00 AM',
    attendees: ['R', 'P', 'A', 'N'],
  },
  {
    id: 2,
    title: 'Project Review',
    time: '2:30 PM',
    attendees: ['S', 'K', 'M'],
  },
]

function StatCard({ title, stat, icon, trend, helpText, color }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const iconBg = useColorModeValue(`${color}.100`, `${color}.900`)
  const iconColor = useColorModeValue(`${color}.500`, `${color}.200`)

  return (
    <Card bg={bgColor}>
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
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Card bg={bgColor}>
      <CardBody>
        <Text fontSize="lg" fontWeight="medium" mb={4}>Recent Activity</Text>
        <Stack spacing={4}>
          {recentActivities.map((activity) => (
            <HStack key={activity.id} spacing={3}>
              <Avatar name={activity.user} size="sm" bg="vrv.500" />
              <Box flex={1}>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="medium">{activity.user}</Text>
                  {' '}{activity.action}{' '}
                  <Text as="span" fontWeight="medium">{activity.target}</Text>
                </Text>
                <Text fontSize="xs" color="gray.500">{activity.time}</Text>
              </Box>
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

function EventsCard() {
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Card bg={bgColor}>
      <CardBody>
        <Text fontSize="lg" fontWeight="medium" mb={4}>Today&apos;s Events</Text>
        <Stack spacing={4}>
          {upcomingEvents.map((event) => (
            <Box key={event.id}>
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="medium">{event.title}</Text>
                <HStack>
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                  <Text fontSize="sm" color="gray.500">{event.time}</Text>
                </HStack>
              </HStack>
              <AvatarGroup size="sm" max={3}>
                {event.attendees.map((attendee, index) => (
                  <Avatar key={index} name={attendee} bg="vrv.500" />
                ))}
              </AvatarGroup>
            </Box>
          ))}
        </Stack>
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
        <StatCard
          title="Total Users"
          stat="125"
          icon={UsersIcon}
          trend={12}
          helpText="vs last month"
          color="blue"
        />
        <StatCard
          title="Active Roles"
          stat="8"
          icon={KeyIcon}
          trend={-5}
          helpText="vs last month"
          color="purple"
        />
        <StatCard
          title="Departments"
          stat="12"
          icon={ChartBarIcon}
          trend={8}
          helpText="vs last month"
          color="green"
        />
        <StatCard
          title="Events"
          stat="28"
          icon={CalendarIcon}
          trend={15}
          helpText="vs last month"
          color="orange"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        <Card bg={bgColor}>
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
                    dot={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: useColorModeValue('white', 'gray.800'),
                      border: 'none',
                    }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        <Card bg={bgColor}>
          <CardBody>
            <Text fontSize="lg" fontWeight="medium" mb={4}>Department Overview</Text>
            <Stack spacing={4}>
              {[
                { name: 'IT', progress: 75, count: 25 },
                { name: 'Sales', progress: 60, count: 18 },
                { name: 'Marketing', progress: 45, count: 12 },
                { name: 'HR', progress: 30, count: 8 },
              ].map((dept) => (
                <Box key={dept.name}>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">{dept.name}</Text>
                    <HStack spacing={2}>
                      <Badge colorScheme="vrv">{dept.count} members</Badge>
                      <Text fontSize="sm" color="gray.500">{dept.progress}%</Text>
                    </HStack>
                  </HStack>
                  <Progress 
                    value={dept.progress} 
                    size="sm" 
                    colorScheme="vrv" 
                    borderRadius="full" 
                  />
                </Box>
              ))}
            </Stack>
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