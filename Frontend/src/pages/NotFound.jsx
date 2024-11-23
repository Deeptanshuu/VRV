import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading
          display="inline-block"
          as="h1"
          fontSize={{ base: '6xl', md: '8xl' }}
          bgGradient="linear(to-r, vrv.400, vrv.600)"
          backgroundClip="text"
        >
          404
        </Heading>

        <Heading as="h2" size="xl" mb={2}>
          Page Not Found
        </Heading>

        <Text fontSize="lg" color={textColor}>
          The page you're looking for doesn't exist or has been moved.
        </Text>

        <Button
          colorScheme="vrv"
          size="lg"
          onClick={() => navigate('/')}
        >
          Go Back Home
        </Button>
      </VStack>
    </Box>
  )
}

export default NotFound 