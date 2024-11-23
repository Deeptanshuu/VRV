/* eslint-disable no-case-declarations */
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
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
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useState } from 'react'
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
  TableCellsIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline'

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
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const chartBg = useColorModeValue('white', 'gray.800')

  // Get filtered data based on time range
  const filteredData = generateDataForRange(timeRange)

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }

  const exportData = (format) => {
    const data = {
      userActivity: filteredData.activity,
      roleDistribution: roleDistributionData,
      permissionUsage: filteredData.permissions,
      loginTrends: filteredData.logins,
      timeRange,
      exportDate: new Date().toISOString(),
    }

    let content = ''
    let filename = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}`
    let blob
    let mimeType

    switch (format) {
      case 'json':
        content = JSON.stringify(data, null, 2)
        filename += '.json'
        mimeType = 'application/json'
        break

      case 'csv':
        // Convert data to CSV format
        const csvRows = [
          // Headers
          ['Date', 'Admin Activity', 'Manager Activity', 'Employee Activity'],
          // Activity Data
          ...filteredData.activity.map(row => [
            row.name,
            row.Admin,
            row.Manager,
            row.Employee
          ]),
          [], // Empty row as separator
          ['Role', 'Count'],
          // Role Distribution
          ...roleDistributionData.map(row => [
            row.name,
            row.value
          ]),
          [], // Empty row as separator
          ['Permission', 'Usage Count'],
          // Permission Usage
          ...filteredData.permissions.map(row => [
            row.name,
            row.count
          ]),
          [], // Empty row as separator
          ['Date', 'Login Count'],
          // Login Trends
          ...filteredData.logins.map(row => [
            row.date,
            row.logins
          ])
        ]
        content = csvRows.map(row => row.join(',')).join('\n')
        filename += '.csv'
        mimeType = 'text/csv'
        break

      case 'html':
        content = `
          <html>
            <head>
              <title>Analytics Report</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f5f5f5; }
                h2 { color: #304945; }
              </style>
            </head>
            <body>
              <h1>Analytics Report - ${new Date().toLocaleDateString()}</h1>
              <h2>User Activity</h2>
              <table>
                <tr>
                  <th>Date</th>
                  <th>Admin</th>
                  <th>Manager</th>
                  <th>Employee</th>
                </tr>
                ${filteredData.activity.map(row => `
                  <tr>
                    <td>${row.name}</td>
                    <td>${row.Admin}</td>
                    <td>${row.Manager}</td>
                    <td>${row.Employee}</td>
                  </tr>
                `).join('')}
              </table>
              
              <h2>Role Distribution</h2>
              <table>
                <tr>
                  <th>Role</th>
                  <th>Count</th>
                </tr>
                ${roleDistributionData.map(row => `
                  <tr>
                    <td>${row.name}</td>
                    <td>${row.value}</td>
                  </tr>
                `).join('')}
              </table>
              
              <h2>Permission Usage</h2>
              <table>
                <tr>
                  <th>Permission</th>
                  <th>Usage Count</th>
                </tr>
                ${filteredData.permissions.map(row => `
                  <tr>
                    <td>${row.name}</td>
                    <td>${row.count}</td>
                  </tr>
                `).join('')}
              </table>
              
              <h2>Login Trends</h2>
              <table>
                <tr>
                  <th>Date</th>
                  <th>Logins</th>
                </tr>
                ${filteredData.logins.map(row => `
                  <tr>
                    <td>${row.date}</td>
                    <td>${row.logins}</td>
                  </tr>
                `).join('')}
              </table>
            </body>
          </html>
        `
        filename += '.html'
        mimeType = 'text/html'
        break
    }

    blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: 'Export Successful',
      description: `Data exported as ${format.toUpperCase()}`,
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg" mb={2}>Analytics Dashboard</Heading>
          <Text color={textColor}>Overview of system usage and trends</Text>
        </Box>
        <HStack spacing={4}>
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

          <Menu>
            <Tooltip label="Export Data">
              <MenuButton
                as={IconButton}
                icon={<ArrowDownTrayIcon className="h-5 w-5" />}
                variant="outline"
                aria-label="Export Data"
              />
            </Tooltip>
            <MenuList>
              <MenuItem 
                icon={<DocumentTextIcon className="h-5 w-5" />}
                onClick={() => exportData('json')}
              >
                Export as JSON
              </MenuItem>
              <MenuItem 
                icon={<TableCellsIcon className="h-5 w-5" />}
                onClick={() => exportData('csv')}
              >
                Export as CSV
              </MenuItem>
              <MenuItem 
                icon={<ChartPieIcon className="h-5 w-5" />}
                onClick={() => exportData('html')}
              >
                Export as HTML Report
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* User Activity Chart */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardBody>
            <Heading size="md" mb={4}>User Activity by Role</Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData.activity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip contentStyle={{ backgroundColor: chartBg }} />
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
                  <RechartsTooltip contentStyle={{ backgroundColor: chartBg }} />
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
                <BarChart data={filteredData.permissions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip contentStyle={{ backgroundColor: chartBg }} />
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
                <LineChart data={filteredData.logins}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip contentStyle={{ backgroundColor: chartBg }} />
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