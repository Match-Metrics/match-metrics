import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Teams } from '../../../api/team/Team';

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const { teams } = useTracker(() => {
    const handler = Meteor.subscribe('allTeams');
    return {
      teams: handler.ready() ? Teams.collection.find({}, { sort: { name: 1 } }).fetch() : [],
    };
  }, []);
  console.log(teams);
  const teamOptions = teams.map(team => ({ label: team.name, value: team._id }));

  const schema = new SimpleSchema({
    email: String,
    password: String,
    role: {
      type: String,
      allowedValues: ['user', 'manager'],
    },
    teamId: {
      type: String,
      optional: true, // Make optional or required based on your logic
      allowedValues: teamOptions.map(option => option.value),
    },
  });

  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password, role, teamId } = doc;

    Meteor.call('createUserWithRole', { email, password, role, teamId }, (err, userId) => {
      if (err) {
        setError(err.reason);
      } else {
        // Reset the error state
        setError('');

        if (role === 'manager') {
          // Managers are directed to the pending approval page without logging in
          setRedirectPath('/pending-approval');
          setRedirectToRef(true);
        } else {
          // Attempt to log in the user
          Meteor.loginWithPassword(email, password, (loginError) => {
            if (loginError) {
              setError(loginError.reason);
            } else {
              // Direct users to the user dashboard upon successful login
              const dashboardPath = '/user-dashboard';
              setRedirectPath(dashboardPath);
              setRedirectToRef(true);
            }
          });
        }
      }
    });
  };

  if (redirectToReferer) {
    // Redirect to the determined path based on the user's role
    return <Navigate to={redirectPath} />;
  }

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <h2 className="text-center mb-4">Register your account</h2>
          <AutoForm schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                <SelectField name="role" options={[{ label: 'User', value: 'user' }, { label: 'Manager', value: 'manager' }]} />
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <SelectField name="teamId" options={teamOptions} placeholder="Select your team" />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light" className="mt-3">
            Already have an account? <Link to="/signin">Login here</Link>.
          </Alert>
          {error && (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
