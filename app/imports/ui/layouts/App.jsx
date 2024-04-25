import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/all/SignUp';
import SignOut from '../pages/all/SignOut';
import CalendarPage from '../pages/team/CalendarPage';
import AddEvent from '../pages/AddEvent';
import AddPlayer from '../pages/AddPlayer';
import AddTeam from '../pages/AddTeam';
import SignIn from '../pages/all/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import Support from '../pages/all/Support';
import UserAnalysis from '../pages/user/UserAnalysis';
import UserDashboard from '../pages/user/UserDashboard';
import UserSettings from '../pages/user/UserSettings';
import ManagerAnalysis from '../pages/manager/ManagerAnalysis';
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import ManagerSettings from '../pages/manager/ManagerSettings';
import AdminDashboard from '../pages/admin/AdminDashboard';
import TeamManagement from '../pages/manager/TeamManagement';
import Communication from '../pages/team/Communication';
import NavBar from '../components/NavBar';
import Team from '../pages/Team';
import MapSearch from '../pages/Mapsearch';
import PlayerStatsPage from '../pages/all/PlayerStatsPage';
import EventPage from '../pages/EventPage';
import UserRoster from '../pages/user/UserRoster';
import UserCommunication from '../pages/user/UserCommunication';
import PendingApproval from '../pages/manager/PendingApproval';
import VideoProcess from '../pages/VideoProcess';
import EditPlayer from '../components/EditPlayer';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          {/* No login required */}
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/support" element={<Support />} />
          {/* Login required */}
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/addevent" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
          <Route path="/addplayer" element={<ProtectedRoute><AddPlayer /></ProtectedRoute>} />
          <Route path="/addteam" element={<ProtectedRoute><AddTeam /></ProtectedRoute>} />
          <Route path="/videoprocess" element={<ProtectedRoute><VideoProcess /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          <Route path="/event" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
          <Route path="/mapsearch" element={<ProtectedRoute><MapSearch /></ProtectedRoute>} />
          <Route path="/communication" element={<ProtectedRoute><Communication /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><PlayerStatsPage /></ProtectedRoute>} />
          {/* User Login required */}
          <Route path="/user-analysis" element={<ProtectedRoute><UserAnalysis /></ProtectedRoute>} />
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/user-settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
          <Route path="/user-roster" element={<ProtectedRoute><UserRoster /></ProtectedRoute>} />
          <Route path="/user-communication" element={<ProtectedRoute><UserCommunication /></ProtectedRoute>} />
          {/* Manager Login required */}
          <Route path="/manager-analysis" element={<ProtectedRoute><ManagerAnalysis /></ProtectedRoute>} />
          <Route path="/manager-dashboard" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
          <Route path="/manager-settings" element={<ProtectedRoute><ManagerSettings /></ProtectedRoute>} />
          <Route path="/team-management" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
          <Route path="/editplayer/:_id" component={EditPlayer} element={<ProtectedRoute><EditPlayer /></ProtectedRoute>} />
          {/* Admin Login required */}
          <Route path="/admin-dashboard" element={<AdminProtectedRoute ready={ready}><AdminDashboard /></AdminProtectedRoute>} />
          {/* template */}
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
