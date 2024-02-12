import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from 'react-bootstrap';

const CalendarPage = () => {
  const calendarRef = useRef(null);

  const handleAddEvent = () => {
    const dateStr = prompt('Enter a date in YYYY-MM-DD');
    const date = new Date(`${dateStr}T00:00:00`);

    if (!Number.isNaN(date.valueOf())) {
      const calendarApi = calendarRef.current.getApi();

      calendarApi.addEvent({
        title: 'New Event',
        start: date,
        allDay: true,
      });
      alert('Adding event to calendar...');
    } else {
      alert('Invalid date');
    }
  };

  return (
    <div>
      <Container>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          intialView="dayGridMonth"
          height="90vh"
          selectable="true"
          editable="true"
          headerToolbar={{
            center: 'addEventButton',
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
