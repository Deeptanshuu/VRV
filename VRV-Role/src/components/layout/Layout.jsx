import { Outlet } from 'react-router-dom'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import Header from './Header'
import Sidebar from './Sidebar'

function Layout() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Flex h="100vh" bg={bgColor}>
      <Sidebar />
      <Box flex="1" overflow="hidden">
        <Header />
        <Box
          as="main"
          h="calc(100vh - 4rem)"
          overflow="auto"
          bg={bgColor}
        >
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout 