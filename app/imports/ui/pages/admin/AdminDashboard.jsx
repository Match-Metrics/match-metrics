import React, { useState } from 'react';
import { Col, Container, Row, Button, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Teams } from '../../../api/team/Team';

const AdminDashboard = () => {
  const [roleFilter, setRoleFilter] = useState('user'); // Default to 'manager'

  const { accountsAwaitingApproval, isLoadingApproval } = useTracker(() => {
    const noDataAvailable = { accountsAwaitingApproval: [] };
    const handler = Meteor.subscribe('accountsAwaitingApproval');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    return {
      accountsAwaitingApproval: Meteor.users.find({ approvalStatus: 'pending', role: 'manager' }).fetch(),
    };
  }, []);

  const { accounts, isLoadingAccounts } = useTracker(() => {
    const accountsHandler = Meteor.subscribe('accountsByRole', roleFilter);
    const teamsHandler = Meteor.subscribe(Teams.userPublicationName);

    if (!accountsHandler.ready() || !teamsHandler.ready()) {
      return { accounts: [], isLoading: true };
    }

    const users = Meteor.users.find({ role: roleFilter }).fetch();
    const teamIds = users.map(user => user.teamId);
    const teams = Teams.collection.find({ _id: { $in: teamIds } }).fetch();
    const teamsMap = teams.reduce((acc, team) => ({ ...acc, [team._id]: team.name }), {});

    return {
      accounts: users.map(user => ({
        ...user,
        teamName: teamsMap[user.teamId] || 'No team',
      })),
      isLoading: false,
    };
  }, [roleFilter]);

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

  const toggleRoleFilter = () => {
    const newFilter = roleFilter === 'manager' ? 'user' : 'manager';
    console.log('Current role filter:', roleFilter, 'New role filter:', newFilter);
    setRoleFilter(newFilter);
  };

  return (
    <Container id="dashboard-page">
      {/* Loading indicator for any async operation */}
      {(isLoadingApproval || isLoadingAccounts) && <div>Loading...</div>}

      {/* Accounts Awaiting Approval Section */}
      <Row className="align-items-center text-center mb-5">
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
                  <td>{user.username}</td>
                  <td>{user.emails[0].address}</td>
                  <td>
                    <Button variant="success" size="sm" onClick={() => approveAccount(user._id)}>Approve</Button>
                    <Button variant="danger" size="sm" onClick={() => rejectAccount(user._id)}>Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Toggle and Accounts Table Section */}
      <Row className="mb-4">
        <Col className="text-center">
          <Button onClick={toggleRoleFilter}>Show {roleFilter === 'manager' ? 'User' : 'Manager'} Accounts</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)} Accounts</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Account Name</th>
                <th>Email</th>
                <td>Role</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Team</td>
              </tr>
            </thead>
            <tbody>
              {accounts.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.emails[0].address}</td>
                  <td>{user.role}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.teamName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
