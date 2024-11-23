import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Roles from './pages/Roles'
import RoleRoute from './components/auth/RoleRoute'
import EmployeeDashboard from './pages/EmployeeDashboard'
import Analytics from './pages/Analytics'
import { authService } from './services/authService'
import Settings from './pages/Settings'
import Calendar from './pages/Calendar'
import Departments from './pages/Departments'
import './App.css'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: '"Space Grotesk", system-ui, sans-serif',
    body: '"Space Grotesk", system-ui, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
      },
    }),
  },
  colors: {
    vrv: {
      50: '#e9efee',
      100: '#c8d5d3',
      200: '#a4bab7',
      300: '#809e9a',
      400: '#5c837e',
      500: '#304945',
      600: '#243634',
      700: '#182423',
      800: '#0c1211',
      900: '#000000',
    },
  },
  components: {
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        },
      }),
    },
    Table: {
      variants: {
        simple: (props) => ({
          th: {
            borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
            color: props.colorMode === 'dark' ? 'gray.400' : 'gray.500',
          },
          td: {
            borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
          },
        }),
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'vrv',
      },
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        },
      }),
    },
    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        },
        item: {
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
        },
      }),
    },
  },
})

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Admin and Manager Routes */}
              <Route
                path="/users"
                element={
                  <RoleRoute allowedRoles={['Admin', 'Manager']}>
                    <Users />
                  </RoleRoute>
                }
              />
              <Route
                path="/roles"
                element={
                  <RoleRoute allowedRoles={['Admin']}>
                    <Roles />
                  </RoleRoute>
                }
              />
              <Route
                path="/departments"
                element={
                  <RoleRoute allowedRoles={['Admin', 'Manager']}>
                    <Departments />
                  </RoleRoute>
                }
              />
              
              {/* Analytics Route */}
              <Route
                path="/analytics"
                element={
                  <RoleRoute allowedRoles={['Admin', 'Manager']}>
                    <Analytics />
                  </RoleRoute>
                }
              />
              
              {/* Employee Dashboard */}
              <Route
                path="/employee"
                element={
                  <RoleRoute allowedRoles={['Employee']}>
                    <EmployeeDashboard />
                  </RoleRoute>
                }
              />

              {/* Settings Route */}
              <Route
                path="/settings"
                element={<Settings />}
              />

              {/* Calendar Route - accessible to all */}
              <Route
                path="/calendar"
                element={<Calendar />}
              />

              {/* Default Route */}
              <Route
                path="/"
                element={
                  <DefaultRoute />
                }
              />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  )
}

// Helper component for default route logic
function DefaultRoute() {
  const user = authService.getCurrentUser()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (['Admin', 'Manager'].includes(user.role)) {
    return <Dashboard />
  }

  return <EmployeeDashboard />
}

export default App
