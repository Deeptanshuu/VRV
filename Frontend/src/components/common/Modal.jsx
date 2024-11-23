import PropTypes from 'prop-types'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react'

function Modal({ isOpen, onClose, title, children }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <ChakraModal 
      isOpen={isOpen} 
      onClose={onClose}
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent
        bg={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="xl"
        mx={4}
      >
        <ModalHeader 
          borderBottomWidth="1px" 
          borderColor={borderColor}
          py={4}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton top={4} />
        <ModalBody py={6}>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal 