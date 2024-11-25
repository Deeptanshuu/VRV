/* eslint-disable no-case-declarations */
import { useState } from 'react'
import {
  Box,
  Card,
  useColorModeValue,
  Select,
  CardBody,
  SimpleGrid,
  Heading,
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
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'

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

// Create data sets for different time ranges
const generateDataForRange = (range) => {
  switch (range) {
    case '24h':
      return {
        activity: activityData.slice(-1),
        logins: loginTrendsData.slice(-1),
        permissions: permissionUsageData.map(item => ({
          ...item,
          count: Math.floor(item.count * 0.2)
        }))
      }
    case '7d':
      return {
        activity: activityData,
        logins: loginTrendsData,
        permissions: permissionUsageData
      }
    case '30d':
      return {
        activity: [...activityData, ...activityData.slice(0, 2)],
        logins: [...loginTrendsData, ...loginTrendsData.slice(0, 2)].map((item, index) => ({
          ...item,
          date: `${index + 1}/11`,
          logins: item.logins * 1.2
        })),
        permissions: permissionUsageData.map(item => ({
          ...item,
          count: Math.floor(item.count * 2.5)
        }))
      }
    case '90d':
      return {
        activity: [...activityData, ...activityData, ...activityData].map(item => ({
          ...item,
          Admin: item.Admin * 1.5,
          Manager: item.Manager * 1.5,
          Employee: item.Employee * 1.5
        })),
        logins: [...loginTrendsData, ...loginTrendsData, ...loginTrendsData].map((item, index) => ({
          ...item,
          date: `${index + 1}/11`,
          logins: item.logins * 1.8
        })),
        permissions: permissionUsageData.map(item => ({
          ...item,
          count: Math.floor(item.count * 4)
        }))
      }
    default:
      return {
        activity: activityData,
        logins: loginTrendsData,
        permissions: permissionUsageData
      }
  }
}

function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const tooltipBg = useColorModeValue('white', 'gray.700')

  // Get filtered data based on time range
  const filteredData = generateDataForRange(timeRange)

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value)
  }

  return (
    <Box p={8}>
      <Card variant="outline" bg={bgColor} border="1px solid" borderColor="#304945" overflow="hidden">
        <Box px={6} py={4}>
          <PageHeader
            title="Analytics Dashboard"
            description="Overview of system usage and trends"
          />
          
          <Select
            size="sm"
            w="150px"
            value={timeRange}
            onChange={handleTimeRangeChange}
            borderColor={borderColor}
            bg={bgColor}
            mb={6}
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </Select>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* User Activity Chart */}
            <Card bg={bgColor} border="1px solid" borderColor="#304945">
              <CardBody>
                <Heading size="md" mb={4}>User Activity</Heading>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip contentStyle={{ backgroundColor: tooltipBg }} />
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
            <Card bg={bgColor} border="1px solid" borderColor="#304945">
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
                      <RechartsTooltip contentStyle={{ backgroundColor: tooltipBg }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>

            {/* Permission Usage Chart */}
            <Card bg={bgColor} border="1px solid" borderColor="#304945">
              <CardBody>
                <Heading size="md" mb={4}>Permission Usage</Heading>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData.permissions}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip contentStyle={{ backgroundColor: tooltipBg }} />
                      <Bar dataKey="count" fill="#304945" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>

            {/* Login Trends Chart */}
            <Card bg={bgColor} border="1px solid" borderColor="#304945">
              <CardBody>
                <Heading size="md" mb={4}>Login Trends</Heading>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData.logins}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip contentStyle={{ backgroundColor: tooltipBg }} />
                      <Line type="monotone" dataKey="logins" stroke="#304945" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>
      </Card>
    </Box>
  )
}

export default Analytics 