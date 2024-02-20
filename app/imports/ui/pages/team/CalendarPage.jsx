import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from 'react-bootstrap';

const CalendarPage = () => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const handleAddEvent = () => {
    navigate('/addevent');
  };

  return (
    <div>
      <Container id="calendar-page">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          intialView="dayGridMonth"
          height="90vh"
          selectable="true"
          editable="true"
          navLinks="true"
          headerToolbar={{
            start: 'addEventButton',
            center: 'title',
            end: 'today dayGridMonth,timeGridWeek,timeGridDay prev,next',
          }}
          customButtons={{
            addEventButton: {
              text: 'Add event',
              click: handleAddEvent,
            },
          }}
        />
      </Container>
    </div>
  );
};

export default CalendarPage;
