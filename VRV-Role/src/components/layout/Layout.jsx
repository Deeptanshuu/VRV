import { Outlet } from 'react-router-dom'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import Header from './Header'
import Sidebar from './Sidebar'

function Layout() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const glowColor = useColorModeValue(
    'rgba(48, 73, 69, 0.3)',
    'rgba(48, 73, 69, 0.3)'
  )

  return (
    <Flex h="100vh" bg={bgColor} position="relative" overflow="hidden">
      {/* Mesh Gradient Background */}
      <Box
        position="fixed"
        inset="0"
        opacity="0.8"
        bgGradient={useColorModeValue(
          'radial-gradient(at 100% 0%, rgba(48, 73, 69, 0.05) 0%, transparent 50%), radial-gradient(at 0% 100%, rgba(48, 73, 69, 0.03) 0%, transparent 50%)',
          'radial-gradient(at 100% 0%, rgba(48, 73, 69, 0.15) 0%, transparent 50%), radial-gradient(at 0% 100%, rgba(48, 73, 69, 0.1) 0%, transparent 50%)'
        )}
        pointerEvents="none"
        zIndex="0"
      />

      {/* Subtle Grid Pattern */}
      <Box
        position="fixed"
        inset="0"
        opacity="0.4"
        backgroundImage={`linear-gradient(${glowColor} 1px, transparent 1px), linear-gradient(to right, ${glowColor} 1px, transparent 1px)`}
        backgroundSize="64px 64px"
        mask="linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
        pointerEvents="none"
        zIndex="0"
      />

      {/* Ambient Light Effect */}
      <Box
        position="fixed"
        top="-50%"
        right="-25%"
        width="80%"
        height="80%"
        background={useColorModeValue(
          'radial-gradient(circle, rgba(48, 73, 69, 0.03) 0%, transparent 70%)',
          'radial-gradient(circle, rgba(48, 73, 69, 0.07) 0%, transparent 70%)'
        )}
        filter="blur(100px)"
        transform="rotate(-15deg)"
        pointerEvents="none"
        zIndex="0"
      />

      {/* Main Content */}
      <Sidebar style={{ position: 'relative', zIndex: 10 }} />
      <Box flex="1" overflow="hidden" position="relative" zIndex="1">
        <Header />
        <Box
          as="main"
          h="calc(100vh - 4rem)"
          overflow="auto"
          position="relative"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: useColorModeValue('gray.200', 'gray.700'),
              borderRadius: '24px',
            },
          }}
        >
          <Box
            position="relative"
            zIndex="2"
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout 