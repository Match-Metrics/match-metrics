import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

/* Enhanced landing page component */
const Landing = () => (
  <Container id="landing-page" fluid className="p-5">
    {/* Hero Section */}
    <Row className="align-items-center text-center mb-5">
      {/* <Col xs={12} md={6}> */}
      {/*  <Image roundedCircle src="/images/meteor-logo.png" width="200px" /> */}
      {/* </Col> */}

      <Col>
        <h1>Welcome to Match Metrics</h1>
        <p>Your online platform for managing, supporting, and evaluating your soccer team.</p>
      </Col>
    </Row>

    {/* Features Section */}
    <Row className="text-center mb-5">
      <Col xs={12} md={4}>
        <h2>Plan Schedules</h2>
        <p>Easily plan and manage your team's schedules, from games to practice sessions.</p>
      </Col>
      <Col xs={12} md={4}>
        <h2>Analyze Performance</h2>
        <p>Get detailed insights into player metrics and game performances through video analysis.</p>
      </Col>
      <Col xs={12} md={4}>
        <h2>Team Collaboration</h2>
        <p>Enhance team collaboration with easy-to-use communication tools and shared resources.</p>
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

export default Landing;
