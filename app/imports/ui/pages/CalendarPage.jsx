import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from 'react-bootstrap';

// const handleDateClick = (arg) => {
// alert(arg.dateStr);
// };
// dateClick={handleDateClick}

// Editable: You can move events
const CalendarPage = () => (
  <div>
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        intialView="dayGridMonth"
        height="90vh"
        events={[
          { title: 'event 1', date: '2024-02-09' },
          { title: 'event 2', date: '2024-02-14' },
        ]}
        selectable="true"
      />
    </Container>
  </div>
);

export default CalendarPage;
