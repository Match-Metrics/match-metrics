import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Teams } from '../../../api/team/Team';

const UserSettings = () => {
  const [password, setPassword] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const handle = Meteor.subscribe(Teams.userPublicationName);
    Tracker.autorun(() => {
      if (handle.ready()) {
        const fetchedTeams = Teams.collection.find().fetch();
        setTeams(fetchedTeams);
        // Set initial team to user's current team if available
        const currentUser = Meteor.user();
        if (currentUser && currentUser.profile && currentUser.profile.teamId) {
          setTeamId(currentUser.profile.teamId);
        }
      }
    });

    return () => {
      handle.stop();
    };
  }, []);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    Meteor.call('changeUserPassword', password, (error) => {
      if (error) {
        setError(error.reason);
        setSuccess('');
      } else {
        setError('');
        setSuccess('Password updated successfully!');
      }
    });
  };

  const handleTeamChange = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    Meteor.call('changeUserTeam', teamId, (error) => {
      if (error) {
        setError(error.reason);
        setSuccess('');
      } else {
        setError('');
        setSuccess('Team updated successfully!');
      }
    });
  };

  return (
    <Container id="settings-page" fluid className="p-5">
      {/* Hero Section */}
      <Row className="align-items-center text-center mb-5">
        <Col className="section-padding">
          <div className="text-background">
            <h1 className="high-contrast-text text-shadow">User Settings</h1>
          </div>
        </Col>
      </Row>

      {/* Error and Success Messages */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Password Change Form */}
      <Form onSubmit={handlePasswordChange}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>

      {/* Team Change Form */}
      <Form onSubmit={handleTeamChange} className="mt-3">
        <Form.Group controlId="formBasicTeam">
          <Form.Label>Select Team</Form.Label>
          <Form.Control as="select" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Team
        </Button>
      </Form>
    </Container>
  );
};

export default UserSettings;
