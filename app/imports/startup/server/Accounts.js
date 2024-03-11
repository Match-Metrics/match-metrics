import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'createUserAccount'({ email, password, role }) {
    if (Meteor.isServer) {
      let userID;

      try {
        userID = Accounts.createUser({ email, password });

        // Check if the role exists, create it if not, and then assign the role to the user
        if (!Roles.roleExists(role)) {
          Roles.createRole(role, { unlessExists: true });
        }

        Roles.addUsersToRoles(userID, role);

        // For debugging purposes
        const userRoles = Roles.getRolesForUser(userID);
        console.log(`Roles for ${email}:`, userRoles);
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Meteor.Error('create-user-failed', error.reason || 'Unknown error creating user');
      }
    } else {
      throw new Meteor.Error('not-allowed', 'This operation is only allowed on the server.');
    }
  },
});
