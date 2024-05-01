import React from 'react';
import { Container, Row } from 'react-bootstrap';

const CalendarPage = () => {
  return (
    <div
      className="justify-content-center align-items-center"
      style={{ paddingTop: 20, paddingBottom: 30 }}
    >
      <h1 className="text-center">Team Calendar</h1>
      <Container>
        <Row>
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Pacific%2FHonolulu&bgcolor=%23ffffff&src=YzU3MTdjNDBhNzM3MTA3OTIyMTIzMzYxNjJkMDYyMWEyNzZjZjk5NzZjYThiNjVhOWU5YmZhMDhjZjhlNWYwYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NjAyMzIwNWM2NzBkOTI3YzE5YTQ3Zjk0MThkZWQ4M2QyYzlmZjcwOWQ0ODk2MDQ3ZjQ0YzJiYjUxZTRiYjljN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23EF6C00&color=%233F51B5"
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
          />
        </Row>
      </Container>
    </div>
  );
};

export default CalendarPage;
