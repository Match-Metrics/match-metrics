import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

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

// meteor methods to create accounts with roles, signup page calls this method
Meteor.methods({
  'createUserWithRole'({ email, password, role }) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
      // Only allow admins to create new users, or remove this check if you want to allow anyone to sign up.
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
    }

    try {
      const userID = Accounts.createUser({ email, username: email, password });

      // Ensure the role exists before trying to assign it
      if (!Roles.roleExists(role)) {
        Roles.createRole(role, { unlessExists: true });
      }

      Roles.addUsersToRoles(userID, role);
      console.log(`User ${email} created with ID: ${userID} and role: ${role}`);

      // return the userID or a success message
    } catch (error) {
      throw new Meteor.Error('create-user-failed', error.message || 'Failed to create user.');
    }
  },
});
