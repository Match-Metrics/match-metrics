import React from 'react';
import { Container, Row, Col, Form, Button, Accordion, Card, CardHeader, AccordionBody } from 'react-bootstrap';

const Support = () => (
  <Container className="my-5">
    <Row className="justify-content-center">
      <Col md={8}>
        <h1 className="text-center mb-4">Support Center</h1>

        {/* FAQ Section */}
        <section className="mb-5">
          <h2>Frequently Asked Questions</h2>
          <Card>
            <Accordion>
              <CardHeader>
                <Accordion.Button>
                  What is Match Metrics?
                </Accordion.Button>
              </CardHeader>
              <AccordionBody>
                Match Metrics is a platform for managing, supporting, and evaluating soccer teams. It provides tools for planning schedules, analyzing performance, and enhancing team collaboration.
              </AccordionBody>
            </Accordion>
          </Card>
          <Card>
            <Accordion>
              <CardHeader>
                <Accordion.Button>
                  How do I get started with Match Metrics?
                </Accordion.Button>
              </CardHeader>
              <AccordionBody>
                To get started, simply create an account and log in. Once logged in, you can start planning schedules, analyzing performance, and collaborating with your team.
              </AccordionBody>
            </Accordion>
          </Card>
          <Card>
            <Accordion>
              <CardHeader>
                <Accordion.Button>
                  How do I analyze performance with Match Metrics?
                </Accordion.Button>
              </CardHeader>
              <AccordionBody>
                Match Metrics provides tools for analyzing player metrics and game performances through video analysis. You can also use the platform to communicate with your team and share resources.
              </AccordionBody>
            </Accordion>
          </Card>
        </section>

        {/* Contact Form Section */}
        <section className="mb-5">
          <h2>Contact Us</h2>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formGroupQuery">
              <Form.Label>Your Query</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Type your query here" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </section>

        {/* Additional Contact Information */}
        <section>
          <h2>Other Ways to Reach Us</h2>
          <p>Email: support@matchmetrics.com</p>
          <p>Phone: +123 456 7890</p>
          {/* Include any other contact information or links to social media as needed */}
        </section>
      </Col>
    </Row>
  </Container>
);

export default Support;
