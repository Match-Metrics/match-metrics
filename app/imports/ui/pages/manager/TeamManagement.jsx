import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* Enhanced landing page component */
const TeamManagement = () => (
  <Container id="roster-page" fluid className="p-5">
    {/* Hero Section */}
    <Row className="align-items-center text-center mb-5">
      <Col className="section-padding">
        <div className="text-background">
          <h1 className="high-contrast-text text-shadow">Manage Roster</h1>
        </div>
      </Col>
    </Row>
  </Container>
);

export default TeamManagement;
