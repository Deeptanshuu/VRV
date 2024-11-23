import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Alert,
  AlertIcon,
  useColorModeValue,
  Card,
  CardBody,
  Heading,
  Text,
  HStack,
  Badge,
  Collapse,
  IconButton,
  useDisclosure,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { InformationCircleIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

function Login() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const buttonHoverBg = useColorModeValue('vrv.50', 'rgba(48, 73, 69, 0.2)')
  const buttonColor = useColorModeValue('vrv.600', 'vrv.200')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false })

  const demoCredentials = [
    { role: 'Admin', email: 'admin@vrv.com', password: 'admin123' },
    { role: 'Manager', email: 'manager@vrv.com', password: 'manager123' },
    { role: 'Employee', email: 'employee@vrv.com', password: 'employee123' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await authService.login(email, password)
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
      })
      navigate('/')
    } catch (err) {
      setError('Invalid email or password')
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      background="radial-gradient(circle, rgba(36, 54, 52, 0.98) 0%, rgba(24, 36, 35, 0.95) 100%)"
      p={4}
      overflow="hidden"
    >
      <Box
        position="fixed"
        top="10%"
        left="50%"
        transform="translate(-50%, -50%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        opacity="1"
        pointerEvents="none"
      >
        <Box
          borderRadius="3xl"
          overflow="hidden"
          width="100px"
          height="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img 
            src="/vite.svg" 
            alt="" 
            width="800" 
            height="800" 
            style={{ 
              transform: 'none',
              borderRadius: '20px'
            }} 
          />
        </Box>
      </Box>

      <Card
        bg={bgColor}
        maxW="md"
        w="full"
        position="relative"
        boxShadow="xl"
        borderRadius="xl"
        borderColor={borderColor}
        pb={12}
      >
        <CardBody p={8}>
          <Stack spacing={6}>
            <Box textAlign="center">
              <Heading 
                size="xl" 
                mb={2}
                bgGradient="linear(to-r, vrv.400, vrv.600)"
                bgClip="text"
              >
                Welcome Back
              </Heading>
              <Text color={textColor}>Sign in to your account</Text>
            </Box>

            {/* Demo Credentials */}
            <Collapse in={isOpen} animateOpacity>
              <Alert 
                status="info" 
                variant="subtle" 
                borderRadius="xl"
                pr={12}
                bg={useColorModeValue('vrv.50', 'rgba(48, 73, 69, 0.2)')}
                color={useColorModeValue('vrv.700', 'vrv.200')}
                backdropFilter="blur(8px)"
              >
                <AlertIcon color={useColorModeValue('vrv.500', 'vrv.200')} />
                <Box flex="1">
                  <Text fontWeight="medium" mb={2}>Demo Credentials</Text>
                  <Stack spacing={2}>
                    {demoCredentials.map((cred) => (
                      <HStack key={cred.role} fontSize="sm" spacing={3}>
                        <Badge
                          colorScheme={
                            cred.role === 'Admin' 
                              ? 'purple' 
                              : cred.role === 'Manager' 
                                ? 'blue' 
                                : 'gray'
                          }
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {cred.role}
                        </Badge>
                        <Text fontFamily="mono">{cred.email} / {cred.password}</Text>
                      </HStack>
                    ))}
                  </Stack>
                </Box>
                <IconButton
                  icon={<XMarkIcon className="h-4 w-4" />}
                  size="sm"
                  variant="ghost"
                  position="absolute"
                  right={2}
                  top={2}
                  onClick={onToggle}
                  aria-label="Close demo credentials"
                  color={useColorModeValue('vrv.500', 'vrv.200')}
                  _hover={{
                    bg: useColorModeValue('vrv.50', 'rgba(48, 73, 69, 0.3)')
                  }}
                />
              </Alert>
            </Collapse>

            {!isOpen && (
              <Button
                leftIcon={<InformationCircleIcon className="h-5 w-5" />}
                variant="ghost"
                size="sm"
                onClick={onToggle}
                color={useColorModeValue('vrv.600', 'vrv.200')}
                _hover={{
                  bg: useColorModeValue('vrv.50', 'rgba(48, 73, 69, 0.2)')
                }}
              >
                Show Demo Credentials
              </Button>
            )}

            {error && (
              <Alert status="error" borderRadius="xl">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    size="lg"
                    borderRadius="lg"
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                    _hover={{
                      borderColor: useColorModeValue('vrv.400', 'vrv.300')
                    }}
                    _focus={{
                      borderColor: useColorModeValue('vrv.500', 'vrv.400'),
                      boxShadow: useColorModeValue(
                        '0 0 0 1px var(--chakra-colors-vrv-500)',
                        '0 0 0 1px var(--chakra-colors-vrv-400)'
                      )
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      borderRadius="lg"
                      bg={useColorModeValue('white', 'gray.800')}
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                      _hover={{
                        borderColor: useColorModeValue('vrv.400', 'vrv.300')
                      }}
                      _focus={{
                        borderColor: useColorModeValue('vrv.500', 'vrv.400'),
                        boxShadow: useColorModeValue(
                          '0 0 0 1px var(--chakra-colors-vrv-500)',
                          '0 0 0 1px var(--chakra-colors-vrv-400)'
                        )
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? 
                          <EyeSlashIcon className="h-5 w-5" /> : 
                          <EyeIcon className="h-5 w-5" />
                        }
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        color={useColorModeValue('gray.400', 'gray.500')}
                        _hover={{
                          bg: 'transparent',
                          color: useColorModeValue('gray.600', 'gray.400')
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="vrv"
                  size="lg"
                  isLoading={isLoading}
                  borderRadius="lg"
                  boxShadow="md"
                  _hover={{
                    transform: 'translateY(-1px)',
                    boxShadow: 'lg',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                    boxShadow: 'md',
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Login 