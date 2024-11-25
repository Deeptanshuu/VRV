/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
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
  Divider,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/authService'
import { InformationCircleIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'

function Login() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('#293836', '#293836')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const demoButtonBg = useColorModeValue('vrv.50', 'rgba(48, 73, 69, 0.2)')
  const demoButtonColor = useColorModeValue('vrv.600', 'vrv.200')
  const alertBg = useColorModeValue('vrv.50', 'rgba(48, 73, 69, 0.2)')
  const alertColor = useColorModeValue('vrv.700', 'vrv.200')
  const alertIconColor = useColorModeValue('vrv.500', 'vrv.200')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
  const { colorMode, toggleColorMode } = useColorMode()

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

  const rightSideGradient = `
    radial-gradient(49% 81% at 45% 47%, rgba(26, 42, 40, 0.37) 0%, rgba(16, 24, 23, 0) 100%),
    radial-gradient(113% 91% at 17% -2%, rgba(44, 82, 75, 1) 1%, rgba(16, 24, 23, 0) 99%),
    radial-gradient(142% 91% at 83% 7%, rgba(39, 63, 59, 0.8) 1%, rgba(16, 24, 23, 0) 99%),
    radial-gradient(142% 91% at -6% 74%, rgba(28, 48, 44, 1) 1%, rgba(16, 24, 23, 0) 99%),
    radial-gradient(142% 91% at 111% 84%, rgba(44, 82, 75, 0.8) 0%, rgba(16, 24, 23, 1) 100%)
  `

  return (
    <Box
      h="100vh"
      w="100vw"
      display="flex"
      overflow="hidden"
      position="relative"
    >
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        position="absolute"
        top={4}
        right={4}
        zIndex={2}
        size="lg"
        borderRadius="full"
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.800', 'yellow.400')}
        boxShadow="lg"
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.700'),
          transform: 'scale(1.05)'
        }}
        _active={{
          bg: useColorModeValue('gray.200', 'gray.600'),
          transform: 'scale(0.95)'
        }}
        transition="all 0.2s"
      />

      {/* Left Side - Now with solid color */}
      <Box
        display={{ base: 'none', lg: 'flex' }}
        w="50%"
        h="100%"
        bg={useColorModeValue('#ffffff', 'gray.800')}
        position="relative"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={10}
        color={useColorModeValue('#1a2a28', 'white')}
      >
        <Box
          maxW="480px"
          textAlign="center"
          position="relative"
          zIndex={2}
        >
          <img 
            src="/vite.svg" 
            alt="VRV Logo" 
            style={{ 
              width: '120px',
              height: '120px',
              margin: '0 auto 2rem',
              filter: 'drop-shadow(0 0 20px rgba(44, 82, 75, 0.2))'
            }} 
          />
          <Heading 
            size="2xl" 
            mb={6}
            color={useColorModeValue('#1a2a28', 'white')}
          >
            Welcome to VRV Security
          </Heading>
          <Divider opacity={1} />
          <Text 
            fontSize="xl" 
            color={useColorModeValue('gray.700', 'gray.100')} 
            mt={8} 
            mb={8}
          >
            Hi, I am Deeptanshu Lal, developer from Mumbai, India. This is my demo project for VRV Security.
            Github: <Link 
              onClick={() => window.open('https://github.com/Deeptanshuu/VRV', '_blank')}
              color={useColorModeValue('#2c524b', '#6394a4')}
              _hover={{ color: useColorModeValue('#1a2a28', 'white') }}
            >
              Project Link
            </Link>
          </Text>
        </Box>
      </Box>

      {/* Right Side - Now with gradient */}
      <Box
        w={{ base: '100%', lg: '50%' }}
        h="100%"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        sx={{
          backgroundSize: '100% 100%',
          backgroundPosition: '0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px',
          backgroundImage: rightSideGradient,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: useColorModeValue(
              'linear-gradient(to top, #1a2a28, #1d2e2b, #1f322f, #223633, #243a36, #263e3a, #28423d, #2a4641, #2c4a45, #2e4e49, #30524c, #325650)',
              '#1a2a28'
            ),
            backdropFilter: 'blur(100px)',
            zIndex: 0
          }
        }}
      >
        <Card
          bg={useColorModeValue('white', 'gray.800')}
          w={{ base: 'full', md: '600px' }}
          maxW="100%"
          position="relative"s
          boxShadow="xl"
          borderRadius="xl"
          border="1px solid"
          borderColor={useColorModeValue('black', '#243634')}
          p={{ base: 4, md: 8 }}
          backdropFilter="blur(10px)"
          zIndex={1}
        >
          <CardBody>
            <Stack spacing={6}>
              <Box textAlign="center">
                <Box display={{ base: 'block', lg: 'none' }}>
                  <img 
                    src="/vite.svg" 
                    alt="VRV Logo" 
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto 0.5rem'
                    }}
                  />
                </Box>
              <Heading 
                  size="xl" 
                  mb={2}
                  bgGradient={useColorModeValue('linear(to-r, vrv.400, vrv.600)', 'linear(to-t, vrv.100, vrv.200)')}
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
                  bg={alertBg}
                  color={alertColor}
                  backdropFilter="blur(8px)"
                  border="1px solid"
                  borderColor="#304945"
                >
                  <AlertIcon color={alertIconColor} />
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
    </Box>
  )
}

export default Login 