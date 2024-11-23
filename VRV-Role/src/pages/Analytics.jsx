import {
  Box,
  Card,
  CardBody,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  Select,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useState } from 'react'

// Activity data for the area chart
const activityData = [
  { name: 'Mon', Admin: 4, Manager: 8, Employee: 15 },
  { name: 'Tue', Admin: 3, Manager: 10, Employee: 18 },
  { name: 'Wed', Admin: 5, Manager: 7, Employee: 12 },
  { name: 'Thu', Admin: 6, Manager: 9, Employee: 16 },
  { name: 'Fri', Admin: 4, Manager: 11, Employee: 14 },
  { name: 'Sat', Admin: 2, Manager: 5, Employee: 8 },
  { name: 'Sun', Admin: 1, Manager: 4, Employee: 6 },
]

// Role distribution data for pie chart
const roleDistributionData = [
  { name: 'Admin', value: 3, color: '#9F7AEA' },
  { name: 'Manager', value: 8, color: '#4299E1' },
  { name: 'Employee', value: 24, color: '#48BB78' },
]

// Permission usage data for bar chart
const permissionUsageData = [
  { name: 'Users View', count: 35 },
  { name: 'Users Edit', count: 28 },
  { name: 'Roles View', count: 20 },
  { name: 'Roles Edit', count: 15 },
  { name: 'Reports', count: 42 },
]

// Login trends data for line chart
const loginTrendsData = [
  { date: '1/11', logins: 23 },
  { date: '2/11', logins: 28 },
  { date: '3/11', logins: 25 },
  { date: '4/11', logins: 35 },
  { date: '5/11', logins: 30 },
  { date: '6/11', logins: 28 },
  { date: '7/11', logins: 32 },
]

function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const chartBg = useColorModeValue('white', 'gray.800')

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg" mb={2}>Analytics Dashboard</Heading>
          <Text color={textColor}>Overview of system usage and trends</Text>
        </Box>
        <HStack>
          <Select
            size="sm"
            w="150px"
            value={timeRange}
            onChange={handleTimeRangeChange}
            borderColor={borderColor}
            bg={chartBg}
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </Select>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* User Activity Chart */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardBody>
            <Heading size="md" mb={4}>User Activity by Role</Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: chartBg }} />
                  <Legend />
                  <Area type="monotone" dataKey="Admin" stackId="1" stroke="#9F7AEA" fill="#9F7AEA" />
                  <Area type="monotone" dataKey="Manager" stackId="1" stroke="#4299E1" fill="#4299E1" />
                  <Area type="monotone" dataKey="Employee" stackId="1" stroke="#48BB78" fill="#48BB78" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Role Distribution Chart */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardBody>
            <Heading size="md" mb={4}>Role Distribution</Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: chartBg }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Permission Usage Chart */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardBody>
            <Heading size="md" mb={4}>Permission Usage</Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={permissionUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: chartBg }} />
                  <Bar dataKey="count" fill="#304945" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Login Trends Chart */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardBody>
            <Heading size="md" mb={4}>Login Trends</Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loginTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: chartBg }} />
                  <Line type="monotone" dataKey="logins" stroke="#304945" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )
}

export default Analytics 