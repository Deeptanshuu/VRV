import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { authService } from '../services/authService'

function EmployeeDashboard() {
  const user = authService.getCurrentUser()
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const activities = [
    { id: 1, type: 'Task', title: 'Project Review', status: 'Pending' },
    { id: 2, type: 'Meeting', title: 'Team Sync', status: 'Scheduled' },
    { id: 3, type: 'Report', title: 'Monthly Update', status: 'Completed' },
  ]

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        {/* Welcome Section */}
        <Card bg={cardBg} borderColor={borderColor} shadow="sm">
          <CardBody>
            <VStack align="start" spacing={2}>
              <Heading size="md">Welcome, {user?.name}</Heading>
              <HStack>
                <Badge colorScheme="vrv">{user?.department}</Badge>
                <Badge colorScheme="purple">{user?.role}</Badge>
              </HStack>
              <Text color={textColor}>
                Here's an overview of your activities and tasks
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Activities Section */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {activities.map((activity) => (
            <Card key={activity.id} bg={cardBg} borderColor={borderColor} shadow="sm">
              <CardBody>
                <VStack align="start" spacing={3}>
                  <HStack justify="space-between" width="full">
                    <Badge colorScheme="blue">{activity.type}</Badge>
                    <Badge
                      colorScheme={
                        activity.status === 'Completed'
                          ? 'green'
                          : activity.status === 'Pending'
                          ? 'yellow'
                          : 'purple'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </HStack>
                  <Heading size="sm">{activity.title}</Heading>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Recent Updates */}
        <Card bg={cardBg} borderColor={borderColor} shadow="sm">
          <CardBody>
            <VStack align="start" spacing={4}>
              <Heading size="md">Recent Updates</Heading>
              <Box width="full">
                {[
                  'New project guidelines have been published',
                  'Team meeting scheduled for next week',
                  'Updated security protocols are now in effect',
                ].map((update, index) => (
                  <Box
                    key={index}
                    p={3}
                    borderBottom={index !== 2 ? '1px' : '0'}
                    borderColor={borderColor}
                  >
                    <Text color={textColor}>{update}</Text>
                  </Box>
                ))}
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

export default EmployeeDashboard 