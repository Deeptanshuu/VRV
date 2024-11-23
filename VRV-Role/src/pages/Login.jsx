import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Card,
  Container,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { authService } from '../services/authService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const inputBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await authService.login(email, password)
      navigate('/')
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to login',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      bgGradient="linear(to-br, vrv.500, vrv.700)"
    >
      {/* Decorative Elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        width="600px"
        height="600px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.03)"
        filter="blur(60px)"
      />
      <Box
        position="absolute"
        bottom="-20%"
        left="-10%"
        width="600px"
        height="600px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.03)"
        filter="blur(80px)"
      />

      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Flex direction="column" align="center" mb="8">
          <Box
            bg={cardBg}
            p="3"
            rounded="2xl"
            mb="6"
            boxShadow="lg"
          >
            <Text
              fontSize="3xl"
              fontWeight="bold"
              bgGradient="linear(to-r, vrv.400, vrv.600)"
              bgClip="text"
            >
              VRV
            </Text>
          </Box>
          <Text color="white" fontSize="lg" textAlign="center" maxW="sm">
            Role Based Access Control System
          </Text>
        </Flex>

        <Card
          py="8"
          px={{ base: '4', sm: '10' }}
          bg={cardBg}
          boxShadow="xl"
          rounded="xl"
          borderTop="4px"
          borderColor="vrv.500"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: '0',
            right: '0',
            left: '0',
            bottom: '0',
            background: useColorModeValue(
              'radial-gradient(circle at top right, rgba(48, 73, 69, 0.03), transparent 400px)',
              'radial-gradient(circle at top right, rgba(48, 73, 69, 0.1), transparent 400px)'
            ),
            borderRadius: 'xl',
            pointerEvents: 'none',
          }}
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading size="lg" mb={2} color="vrv.500">Welcome Back</Heading>
              <Text color={textColor}>Sign in to your account</Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    size="lg"
                    bg={inputBg}
                    borderColor={borderColor}
                    _hover={{ borderColor: 'vrv.400' }}
                    _focus={{ borderColor: 'vrv.500', boxShadow: '0 0 0 1px var(--chakra-colors-vrv-500)' }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      bg={inputBg}
                      borderColor={borderColor}
                      _hover={{ borderColor: 'vrv.400' }}
                      _focus={{ borderColor: 'vrv.500', boxShadow: '0 0 0 1px var(--chakra-colors-vrv-500)' }}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        icon={
                          showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="vrv"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  boxShadow="md"
                  _hover={{
                    transform: 'translateY(-1px)',
                    boxShadow: 'lg',
                  }}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Text textAlign="center" fontSize="xs" color={textColor}>
              Default Admin credentials: admin@vrv.com / admin123
              <br />
              Default Manager credentials: manager@vrv.com / manager123
              <br />
              Default Employee credentials: employee@vrv.com / employee123
            </Text>
          </VStack>
        </Card>
      </Container>
    </Box>
  )
}

export default Login 