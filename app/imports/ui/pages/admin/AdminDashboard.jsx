import React from 'react';
import { Col, Container, Row, Button, Card, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const AdminDashboard = () => {
  // eslint-disable-next-line no-shadow
  const { accountsAwaitingApproval, isLoading } = useTracker(() => {
    const noDataAvailable = { accountsAwaitingApproval: [] };
    const handler = Meteor.subscribe('accountsAwaitingApproval');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    // eslint-disable-next-line no-shadow
    const accountsAwaitingApproval = Meteor.users.find({ approvalStatus: 'pending', role: 'manager' }).fetch();
    return { accountsAwaitingApproval };
  }, []);

  const approveAccount = (userId) => {
    Meteor.call('approveManager', userId, (error) => {
      if (error) {
        alert(`Error: ${error.reason}`);
      } else {
        alert('Account approved successfully.');
      }
    });
  };

  const rejectAccount = (userId) => {
    Meteor.call('rejectAccount', userId, (error) => {
      if (error) {
        alert(`Error: ${error.reason}`);
      } else {
        alert('Account rejected.');
      }
    });
  };

  return (
    <Container id="dashboard-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
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
                  {accountsAwaitingApproval.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.emails[0].address}</td>
                      <td>
                        <Button variant="success" size="sm" onClick={() => approveAccount(user._id)}>Approve</Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => rejectAccount(user._id)}>Reject</Button>
                      </td>
                    </tr>
                  ))}
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
        </>
      )}
    </Container>
  );
};
export default AdminDashboard;
