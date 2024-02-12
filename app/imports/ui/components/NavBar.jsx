import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2>Match Metrics</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {/* any logged in user */}
            {currentUser ? ([
              <Nav.Link id="communication-nav" as={NavLink} to="/communication" key="communication">Communication</Nav.Link>,
            ]) : ''}
            { /* Admin only */ }
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="admin-dashboard-nav" as={NavLink} to="/admin-dashboard" key="admin-dashboard">Admin Dashboard</Nav.Link>
            ) : ''}
            { /* Manager only */ }
            {Roles.userIsInRole(Meteor.userId(), 'manager') ? ([
              <Nav.Link id="manager-analysis-nav" as={NavLink} to="/manager-analysis" key="manager-analysis">Manager</Nav.Link>,
              <Nav.Link id="manager-dashboard-nav" as={NavLink} to="/manager-dashboard" key="manager-dashboard">Manager</Nav.Link>,
              <Nav.Link id="team-management-nav" as={NavLink} to="/team-management" key="team-management">Manager</Nav.Link>,
            ]) : ''}
            {/* Display when not logged in */}
            <Nav.Link id="support-nav" as={NavLink} to="/support" key="support">Support Page</Nav.Link>,
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
