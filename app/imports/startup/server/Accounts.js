import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Teams } from '../../api/team/Team';

/* eslint-disable no-console */

const createUser = (email, password, role) => {
  console.log(`Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });

  // Check if the role is 'admin' and assign it
  if (role === 'admin') {
    Roles.createRole('admin', { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
    // eslint-disable-next-line brace-style
  }
  // Check if the role is 'manager' and assign it
  else if (role === 'manager') {
    Roles.createRole('manager', { unlessExists: true });
    Roles.addUsersToRoles(userID, 'manager');
    // eslint-disable-next-line brace-style
  }
  // Optionally, handle the 'user' role or other roles
  else if (role === 'user') {
    Roles.createRole('user', { unlessExists: true });
    Roles.addUsersToRoles(userID, 'user');
  }
};

// When running app for the first time, pass a settings file to set up default user accounts.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database! Please invoke Meteor with a settings file.');
  }
}
Accounts.validateLoginAttempt((attempt) => {
  if (attempt.user && attempt.user.role === 'manager') {
    const managerStatus = attempt.user?.approvalStatus || 'approved';
    if (managerStatus === 'pending') {
      throw new Meteor.Error('pending-approval', 'Your account is awaiting approval.');
    }
  }
  return true;
});

// meteor methods to create accounts with roles, signup page calls this method
Meteor.methods({
  createUserWithRole({ email, firstName, lastName, password, role, teamId }) {
    const userId = Accounts.createUser({ email, username: email, password });
    if (!userId) {
      throw new Meteor.Error('user-creation-failed', 'Failed to create user');
    }

    // Check and create role if it does not exist
    Roles.createRole(role, { unlessExists: true });
    if (role === 'user') {
      Roles.addUsersToRoles(userId, 'user');
      Meteor.users.update(userId, { $set: { role } });
    }
    // If the role is 'manager', mark the account as pending approval
    if (role === 'manager') {
      Meteor.users.update(userId, { $set: { approvalStatus: 'pending', role } });
    }
    Meteor.users.update(userId, { $set: { firstName: firstName, lastName: lastName, teamId: teamId } });
    console.log(Roles.getRolesForUser(userId));

    return userId; // This ID will be used for further actions on the client-side

  },
  // eslint-disable-next-line meteor/audit-argument-checks
  'approveManager'(userId) {
    // Ensure this method can only be called by authorized users
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action');
    }
    Meteor.users.update(userId, { $set: { approvalStatus: 'approved' } });
    Roles.createRole('manager', { unlessExists: true });
    Roles.addUsersToRoles(userId, 'manager');
  },
  // eslint-disable-next-line meteor/audit-argument-checks
  'rejectAccount'(userId) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'You must be an admin to reject accounts.');
    }
    // remove account
    Meteor.users.remove(userId);
  },
  getUserRoles: function () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to get roles');
    }

    return Roles.getRolesForUser(this.userId);
  },
  // eslint-disable-next-line meteor/audit-argument-checks
  changeUserTeam(teamId) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to update your team.');
    }

    // Optional: Check if the team exists
    const teamExists = Teams.collection.findOne({ _id: teamId });
    if (!teamExists) {
      throw new Meteor.Error('invalid-team', 'The specified team does not exist.');
    }

    // Optional: Add additional checks for whether the user can join this team

    Meteor.users.update(this.userId, {
      $set: {
        teamId: teamId,
      },
    });
  },
  // eslint-disable-next-line meteor/audit-argument-checks
  changeUserPassword(newPassword) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to change your password.');
    }

    if (newPassword.length < 6) {
      throw new Meteor.Error('invalid-password', 'Password must be at least 6 characters long.');
    }

    Accounts.setPassword(this.userId, newPassword, { logout: false });
  },
});
