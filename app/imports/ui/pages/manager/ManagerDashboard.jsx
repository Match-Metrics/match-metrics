import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

/* Enhanced landing page component */
const ManagerDashboard = () => (
  <Container id="landing-page" fluid className="p-5">
    {/* Hero Section */}
    <Row className="align-items-center text-center mb-5">
      <Col className="section-padding">
        <div className="text-background">
          <h1 className="high-contrast-text text-shadow">Welcome to Match Metrics</h1>
          <p className="high-contrast-text">Your online platform for managing, supporting, and evaluating your soccer team.</p>
        </div>
      </Col>
    </Row>

    {/* Features Section */}
    <Row className="text-center mb-5">
      <Col xs={12} md={4}>
        <div className="text-background">
          <h2 className="high-contrast-text text-shadow">Plan Schedules</h2>
          <p className="high-contrast-text">Easily plan and manage your team's schedules, from games to practice sessions.</p>
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div className="text-background">
          <h2 className="high-contrast-text text-shadow">Analyze Performance</h2>
          <p className="high-contrast-text">Get detailed insights into player metrics and game performances through video analysis.</p>
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div className="text-background">
          <h2 className="high-contrast-text text-shadow">Team Collaboration</h2>
          <p className="high-contrast-text">Enhance team collaboration with easy-to-use communication tools and shared resources.</p>
        </div>
      </Col>
    </Row>

    {/* Testimonials Section */}
    {/* <Row className="text-center mb-5"> */}
    {/*  <Col xs={12}> */}
    {/*    <h2>What Coaches Say</h2> */}
    {/*    <blockquote className="blockquote"> */}
    {/*      <p>"Soccer Manager has transformed the way we prepare for matches and analyze our performance."</p> */}
    {/*      <footer className="blockquote-footer">Coach John Doe</footer> */}
    {/*    </blockquote> */}
    {/*  </Col> */}
    {/* </Row> */}

    {/* Call to Action Section */}
    <Row className="text-center">
      <Col xs={12}>
        <Button variant="success" size="lg">Join Now and Elevate Your Team's Performance</Button>
      </Col>
    </Row>
  </Container>
);

export default ManagerDashboard;
