import React from 'react';
import { Col, Container, Row, Button, Card, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => (
  <Container id="dashboard-page">
    <Row className="align-items-center text-center mb-5">
      <Col>
        <div className="text-background">
          <h1 className="high-contrast-text text-shadow">Admin Dashboard</h1>
        </div>
      </Col>
    </Row>

    {/* Accounts Awaiting Approval Section */}
    <Row className="mb-4">
      <Col>
        <h2>Accounts Awaiting Approval</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Account Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows - replace with dynamic content */}
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>johndoe@example.com</td>
              <td>
                <Button variant="success" size="sm">Approve</Button>{' '}
                <Button variant="danger" size="sm">Reject</Button>
              </td>
            </tr>
            {/* Repeat for each account awaiting approval */}
          </tbody>
        </Table>
      </Col>
    </Row>

    {/* Manage Accounts Section */}
    <Row>
      <Col md={4} lg={4} className="mb-3">
        <Card className="dashboard-card">
          <Card.Body>
            <Card.Title>Manage Accounts</Card.Title>
            <div className="d-flex justify-content-start">
              <Button as={NavLink} to="/user-accounts" variant="info" className="me-2">
                User Accounts
              </Button>
              <Button as={NavLink} to="/manager-accounts" variant="info">
                Manager Accounts
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default AdminDashboard;
