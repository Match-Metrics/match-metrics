import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const schema = new SimpleSchema({
    email: String,
    password: String,
    role: {
      type: String,
      allowedValues: ['user', 'manager'],
    },
  });

  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password, role } = doc;

    Meteor.call('createUserWithRole', { email, password, role }, (err, userId) => {
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
          // Other roles (e.g., 'user') proceed with login
          Roles.addUsersToRoles(userId, role);
          Meteor.loginWithPassword(email, password, (loginError) => {
            if (loginError) {
              setError(loginError.reason);
            } else {
              // Direct users to the user dashboard upon successful login
              setRedirectPath('/user-dashboard');
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
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <SelectField name="role" options={[{ label: 'User', value: 'user' }, { label: 'Manager', value: 'manager' }]} />
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
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
