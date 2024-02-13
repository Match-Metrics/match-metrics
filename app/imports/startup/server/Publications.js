import { Meteor } from 'meteor/meteor';
import * as Events from 'events';
import { Players } from '../../api/player/Player';
import { Teams } from '../../api/team/Team';

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
