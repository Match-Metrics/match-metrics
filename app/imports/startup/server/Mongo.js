import { Meteor } from 'meteor/meteor';
import { Players } from '../../api/player/Player';
import { Teams } from '../../api/team/Team';
import { Events } from '../../api/event/Event';

const addPlayer = (player) => {
  console.log(`  Adding: ${player.firstName} (${player.owner})`);
  Players.collection.insert(player);
};

if (Players.collection.find().count() === 0) {
  if (Meteor.settings.defaultPlayers) {
    console.log('Creating default players.');
    Meteor.settings.defaultPlayers.forEach(data => addPlayer(data));
  }
}

const addTeam = (team) => {
  console.log(`  Adding: ${team.name} (${team.owner})`);
  Teams.collection.insert(team);
};

if (Teams.collection.find().count() === 0) {
  if (Meteor.settings.defaultTeams) {
    console.log('Creating default teams.');
    Meteor.settings.defaultTeams.forEach(data => addTeam(data));
  }
}

const addEvent = (event) => {
  console.log(`  Adding: ${event.name} (${event.owner})`);
  Events.collection.insert(event);
};

if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.forEach(data => addEvent(data));
  }
}
