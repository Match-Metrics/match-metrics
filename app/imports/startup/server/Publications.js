import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Players } from '../../api/player/Player';
import { Teams } from '../../api/team/Team';
import { Events } from '../../api/event/Event';
import { Videos } from '../../api/video/Video';

Meteor.publish(Events.userPublicationName, function () {
  if (this.userId) {
    return Events.collection.find();
  }
  return this.ready();
});
Meteor.publish(Players.userPublicationName, function () {
  if (this.userId) {
    return Players.collection.find();
  }
  return this.ready();
});

Meteor.publish(Videos.userPublicationName, function () {
  if (this.userId) {
    return Videos.collection.find();
  }
  return this.ready();
});

Meteor.publish(Teams.userPublicationName, function () {
  if (this.userId) {
    return Teams.collection.find();
  }
  return this.ready();
});
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('accountsAwaitingApproval', function () {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({ role: 'manager', approvalStatus: 'pending' });
  }
  // Prevent non-admins from accessing this publication
  return this.ready();

});

// eslint-disable-next-line meteor/audit-argument-checks
Meteor.publish('accountsByRole', function (role) {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }

  return Meteor.users.find({ role: role }, {
    fields: { emails: 1, username: 1, role: 1 },
  });
});

Meteor.publish('allAccounts', function () {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find({}, {
    fields: { emails: 1, username: 1, role: 1 },
  });
});

// all teams
Meteor.publish('allTeams', function () {
  return Teams.collection.find();
});

Meteor.publish('userTeam', function () {
  if (!this.userId) return this.ready();

  const user = Meteor.users.findOne(this.userId, { fields: { teamId: 1 } });
  if (!user.teamId) return this.ready();

  return Teams.collection.find({ _id: user.teamId });
});
