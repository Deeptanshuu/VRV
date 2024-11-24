import { useState, useRef } from 'react'
import {
  Box,
  Card,
  Button,
  useDisclosure,
  useToast,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Select,
  Heading,
  Text,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid/index.js'
import timeGridPlugin from '@fullcalendar/timegrid/index.js'
import interactionPlugin from '@fullcalendar/interaction/index.js'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline'
import PageHeader from '../components/layout/PageHeader'

function Calendar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: '2024-03-15T10:00:00',
      end: '2024-03-15T11:00:00',
      backgroundColor: '#304945',
    },
    {
      id: 2,
      title: 'Project Review',
      start: '2024-03-16T14:00:00',
      end: '2024-03-16T15:30:00',
      backgroundColor: '#304945',
    },
  ])
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    type: 'meeting',
  })
  const [currentView, setCurrentView] = useState('dayGridMonth')
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const [eventToDelete, setEventToDelete] = useState(null)
  const { isOpen: isDeleteOpen, onOpen: openDelete, onClose: closeDelete } = useDisclosure()
  const cancelRef = useRef()

  const handleDateClick = (arg) => {
    const date = new Date(arg.date)
    const formattedDate = date.toISOString().split('T')[0]
    
    setSelectedDate(date)
    setNewEvent({
      title: '',
      description: '',
      start: `${formattedDate}T09:00:00`,
      end: `${formattedDate}T10:00:00`,
      type: 'meeting',
    })
    onOpen()
  }

  const handleEventClick = (info) => {
    setEventToDelete(info.event)
    openDelete()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newEvent.title) {
      toast({
        title: 'Error',
        description: 'Event title is required',
        status: 'error',
        duration: 2000,
      })
      return
    }

    const eventId = Math.max(0, ...events.map(e => e.id)) + 1
    const newEventData = {
      id: eventId,
      ...newEvent,
      backgroundColor: '#304945',
      borderColor: '#304945',
    }
    setEvents(prev => [...prev, newEventData])
    toast({
      title: 'Event created',
      status: 'success',
      duration: 2000,
      position: 'top',
    })
    onClose()
    setNewEvent({
      title: '',
      description: '',
      start: '',
      end: '',
      type: 'meeting',
    })
  }

  const handleViewChange = (newView) => {
    setCurrentView(newView)
  }

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      setEvents(prev => prev.filter(event => event.id !== eventToDelete.id))
      toast({
        title: 'Event Deleted',
        description: 'The event has been successfully deleted',
        status: 'success',
        duration: 2000,
        position: 'top',
      })
      closeDelete()
      setEventToDelete(null)
    }
  }

  return (
    <Box p={8}>
      <Card variant="outline" bg={bgColor} border="1px solid" borderColor="#304945" overflow="hidden">
        <Box px={6} py={4}>
          <PageHeader
            title="Calendar"
            description="Manage your events and schedules"
            buttonLabel="Add Event"
            buttonIcon={PlusIcon}
            onButtonClick={() => {
              setSelectedDate(new Date())
              onOpen()
            }}
          />

          {/* Warning Banner */}
          <Alert 
            status="warning" 
            variant="left-accent" 
            mb={6} 
            rounded="md"
          >
            <AlertIcon />
            <Box>
              <AlertTitle>Beta Feature</AlertTitle>
              <AlertDescription>
                The calendar feature is currently in development and may have some issues. Some functionality might be limited or unstable.
              </AlertDescription>
            </Box>
          </Alert>

          {/* Calendar Card */}
          <Card
            bg={bgColor}
            border="1px solid"
            borderColor="#304945"
            shadow="sm"
            p={{ base: 2, md: 6 }}
            h="calc(100vh - 200px)"
            overflow="hidden"
          >
            <Box
              h="100%"
              className="calendar-container"
              sx={{
                '.fc': {
                  height: '100%',
                },
                '.fc .fc-toolbar.fc-header-toolbar': {
                  mb: 4,
                  flexWrap: 'wrap',
                  gap: 2,
                },
                '.fc-theme-standard .fc-scrollgrid': {
                  borderColor: borderColor,
                },
                '.fc-theme-standard td, .fc-theme-standard th': {
                  borderColor: borderColor,
                },
                '.fc-timegrid-slot-label': {
                  color: textColor,
                },
                '.fc-daygrid-day-number': {
                  color: textColor,
                },
                '.fc-col-header-cell-cushion': {
                  color: textColor,
                },
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={currentView}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="100%"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                themeSystem="standard"
              />
            </Box>
          </Card>

          {/* Event Modal */}
          <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size={{ base: "full", md: "md" }}
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent mx={4}>
              <ModalHeader>Add New Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Event Title</FormLabel>
                      <Input
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Enter event title"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Enter event description"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Event Type</FormLabel>
                      <Select
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      >
                        <option value="meeting">Meeting</option>
                        <option value="task">Task</option>
                        <option value="reminder">Reminder</option>
                      </Select>
                    </FormControl>

                    <Stack 
                      direction={{ base: 'column', sm: 'row' }} 
                      spacing={4} 
                      w="full"
                    >
                      <FormControl isRequired>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          type="datetime-local"
                          value={newEvent.start}
                          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>End Time</FormLabel>
                        <Input
                          type="datetime-local"
                          value={newEvent.end}
                          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                        />
                      </FormControl>
                    </Stack>

                    <HStack spacing={3} width="full" justify="flex-end" pt={4}>
                      <Button onClick={onClose} w={{ base: 'full', sm: 'auto' }}>
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        colorScheme="vrv"
                        w={{ base: 'full', sm: 'auto' }}
                      >
                        Add Event
                      </Button>
                    </HStack>
                  </VStack>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Delete Event Dialog */}
          <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={closeDelete}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Event
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={closeDelete}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDeleteEvent} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Card>
    </Box>
  )
}

export default Calendar 