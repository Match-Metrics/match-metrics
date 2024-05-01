import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* Enhanced landing page component */
const Communication = () => (
  <Container id="communication-page" fluid className="p-5">
    {/* Hero Section */}
    <Row className="align-items-center text-center mb-5">
      <Col className="section-padding">
        <div className="text-background">
          <h1 className="high-contrast-text text-shadow">Communication</h1>
          <p>Set up a preferred communication method between you and the rest of your team!</p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Communication;
