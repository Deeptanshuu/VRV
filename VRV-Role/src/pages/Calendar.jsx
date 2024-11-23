import { useState } from 'react'
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
} from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { authService } from '../services/authService'

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
  const toast = useToast()
  const user = authService.getCurrentUser()

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date)
    setNewEvent(prev => ({
      ...prev,
      start: arg.dateStr + 'T09:00:00',
      end: arg.dateStr + 'T10:00:00',
    }))
    onOpen()
  }

  const handleEventClick = (info) => {
    toast({
      title: info.event.title,
      description: info.event.extendedProps.description || 'No description available',
      status: 'info',
      duration: 3000,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const eventId = Math.max(0, ...events.map(e => e.id)) + 1
    const newEventData = {
      id: eventId,
      ...newEvent,
      backgroundColor: '#304945',
      borderColor: '#304945',
    }
    setEvents([...events, newEventData])
    toast({
      title: 'Event created',
      status: 'success',
      duration: 2000,
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

  return (
    <Box p={8}>
      <Card
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        shadow="sm"
        p={6}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="80vh"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          themeSystem="standard"
        />
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
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

                <HStack spacing={3} width="full" justify="flex-end">
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="submit" colorScheme="vrv">
                    Add Event
                  </Button>
                </HStack>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Calendar 