import React from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const UserDashboard = () => (
  <Container id="dashboard-page">
    <Row className="align-items-center text-center mb-5">
      <Col className="section-padding">
        <div className="text-background">
          <h1 className="high-contrast-text text-shadow">Your Dashboard</h1>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>Performance Analysis</Card.Title>
            <Card.Text>
              View your performance stats and improve your game.
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
            <Card.Title>User Settings</Card.Title>
            <Card.Text>
              Customize your preferences and update your profile.
            </Card.Text>
            <Button as={NavLink} to="/user-settings" variant="primary" block>
              Settings
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>View Team Roster</Card.Title>
            <Card.Text>
              Check out your team's roster and connect with teammates.
            </Card.Text>
            <Button as={NavLink} to="/team-roster" variant="primary" block>
              Team Roster
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>User Calendar</Card.Title>
            <Card.Text>
              Stay on top of your schedule with your personal calendar.
            </Card.Text>
            <Button as={NavLink} to="/user-calendar" variant="primary" block>
              Calendar
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>User Communication</Card.Title>
            <Card.Text>
              Keep in touch with your team and manage communications.
            </Card.Text>
            <Button as={NavLink} to="/user-communication" variant="primary" block>
              Communicate
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default UserDashboard;
