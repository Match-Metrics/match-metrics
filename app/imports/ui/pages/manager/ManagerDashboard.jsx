import React from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/* Enhanced landing page component */
const ManagerDashboard = () => (
  <Container id="dashboard-page">
    <Row className="align-items-center text-center mb-5">
      <Col className="section-padding">
        <div className="text-background">
          <h1 className="high-contrast-text text-shadow">[Team Name] Dashboard</h1>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>Team Analysis</Card.Title>
            <Card.Text>
              View your team stats and review game footage.
            </Card.Text>
            <Button as={NavLink} to="/user-analysis" variant="primary" block>
              Explore
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>Team Management</Card.Title>
            <Card.Text>
              View and Manage your roster.
            </Card.Text>
            <Button as={NavLink} to="/team-management" variant="primary" block>
              Manage
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>Team Calendar</Card.Title>
            <Card.Text>
              View or edit your team's calendar.
            </Card.Text>
            <Button as={NavLink} to="/calendar" variant="primary" block>
              Calendar
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>Team Communication</Card.Title>
            <Card.Text>
              Keep in touch with your team and manage communications.
            </Card.Text>
            <Button as={NavLink} to="/communication" variant="primary" block>
              Communicate
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default ManagerDashboard;
