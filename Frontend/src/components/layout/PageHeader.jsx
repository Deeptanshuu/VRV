import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

function PageHeader({ 
  title, 
  description, 
  buttonLabel, 
  buttonIcon: Icon, 
  onButtonClick 
}) {
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align={{ base: 'stretch', md: 'center' }}
      spacing={{ base: 4, md: 0 }}
      mb={6}
    >
      <Box>
        <Heading size="lg" mb={1}>{title}</Heading>
        <Text color={textColor}>{description}</Text>
      </Box>
      
      {buttonLabel && (
        <Button
          leftIcon={Icon && <Icon className="h-5 w-5" />}
          colorScheme="vrv"
          onClick={onButtonClick}
          width={{ base: 'full', md: 'auto' }}
          size={isMobile ? 'md' : 'md'}
        >
          {buttonLabel}
        </Button>
      )}
    </Stack>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  buttonIcon: PropTypes.elementType,
  onButtonClick: PropTypes.func,
}

export default PageHeader 