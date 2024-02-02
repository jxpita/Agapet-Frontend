import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import ShowEvent from '../modals/showEvent/ShowEvent';
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = momentLocalizer(moment)

const MyCalendar = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const handleOpenModal = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleEventClick = (event) => {
    handleOpenModal(event);
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={props.myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={event => handleEventClick(event)}
      />
      
      <ShowEvent
        showModal={showModal}
        onCloseModal={handleCloseModal}
        currentEvent={currentEvent}
      />
    </div>
  )
}

export default MyCalendar;