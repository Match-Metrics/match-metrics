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
              <Nav.Link id="team-nav" as={NavLink} to="/team">Teams</Nav.Link>,
              <Nav.Link id="player-stats-nav" as={NavLink} to="/stats">Player Stats</Nav.Link>,
              <Nav.Link id="communication-nav" as={NavLink} to="/communication" key="communication">Communication</Nav.Link>,
            ]) : ''}
            { /* Admin only */ }
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="admin-dashboard-nav" as={NavLink} to="/admin-dashboard" key="admin-dashboard">Admin Dashboard</Nav.Link>
            ) : ''}
            { /* Manager only */ }
            {Roles.userIsInRole(Meteor.userId(), 'manager') ? ([
              // <Nav.Link id="manager-analysis-nav" as={NavLink} to="/manager-analysis" key="manager-analysis">Manager Analysis</Nav.Link>,
              <Nav.Link id="manager-dashboard-nav" as={NavLink} to="/manager-dashboard" key="manager-dashboard">Manager Dashboard</Nav.Link>,
              // <Nav.Link id="team-management-nav" as={NavLink} to="/team-management" key="team-management">Team Management</Nav.Link>,
            ]) : ''}
            { /* User only */ }
            {currentUser && !Roles.userIsInRole(Meteor.userId(), ['admin', 'manager']) ? ([
              // <Nav.Link id="user-analysis-nav" as={NavLink} to="/user-analysis" key="user-analysis">User Analysis</Nav.Link>,
              <Nav.Link id="user-dashboard-nav" as={NavLink} to="/user-dashboard" key="user-dashboard">User Dashboard</Nav.Link>,
              // <Nav.Link id="user-settings-nav" as={NavLink} to="/user-settings" key="user-settings">User Settings</Nav.Link>,
            ]) : ''}
            {/* Display when not logged in */}
            <Nav.Link id="support-nav" as={NavLink} to="/support" key="support">Support Page</Nav.Link>,
            <NavDropdown id="event-dropdown" title="Event">
              <NavDropdown.Item id="mapsearch-nav" as={NavLink} to="/mapsearch">
                MapSearch
              </NavDropdown.Item>
              <NavDropdown.Item id="calendar-nav" as={NavLink} key="calendar" to="/calendar">
                Calendar
              </NavDropdown.Item>
              <NavDropdown.Item id="add-event-nav" as={NavLink} to="/event">
                Event
              </NavDropdown.Item>
            </NavDropdown>,
            <NavDropdown id="add-dropdown" title="Add">
              <NavDropdown.Item id="add-player-nav" as={NavLink} to="/addplayer">
                Player
              </NavDropdown.Item>
              <NavDropdown.Item id="add-team-nav" as={NavLink} to="/addteam">
                Team
              </NavDropdown.Item>
              <NavDropdown.Item id="add-event-nav" as={NavLink} to="/addevent">
                Event
              </NavDropdown.Item>
              <NavDropdown.Item id="video-process-nav" as={NavLink} to="/videoprocess">
                Video Process
              </NavDropdown.Item>
            </NavDropdown>,
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
