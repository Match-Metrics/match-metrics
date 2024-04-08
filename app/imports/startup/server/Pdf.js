// Ensure fetch is available
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import nodeFetch from 'node-fetch';
import { Players } from '../../api/player/Player';
import { Teams } from '../../api/team/Team';

if (!globalThis.fetch) {
  globalThis.fetch = nodeFetch;
}

Meteor.methods({
  'files.upload'(file) {
    check(file, Object);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const buffer = Buffer.from(file.content, 'base64');

    pdfParse(buffer).then(async data => {
      // console.log(data.text);
      const API_KEY = 'AIzaSyB0N-ddxiCEEeAbO7kBQU3662rAkNBKeUE';
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
      const prompt = `Return a list of all unique players and their team, and number of goals and assists in the text. Separate each player by a semicolon, and commas between their name, team, goals, and assists'\n${data.text}`;

      try {
        const result = await model.generateContent(prompt);
        const textResponse = await result.response.text();
        console.log(textResponse);
        Meteor.call('processPlayersData', textResponse);

      } catch (err) {
        console.error('Error processing file:', err);
        throw new Meteor.Error('PDF parsing failed', err.message);
      }
    }).catch(err => {
      throw new Meteor.Error('PDF parsing failed', err.message);
    });
  },
  'processPlayersData'(data) {
    check(data, String);

    // Split the data by semicolon to get each player's data
    const playerEntries = data.split(';');

    playerEntries.forEach((entry) => {
      const [fullName, teamName, goals, assists] = entry.split(',').map(item => item.trim());
      const nameParts = fullName.split(' ');

      // Check if the name can be split into first and last names
      if (nameParts.length < 2) {
        console.error(`Invalid player name format: ${fullName}`);
        return; // Skip this entry
      }

      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' '); // Handles middle names or multiple last names

      // Trim values to remove any leading/trailing whitespace
      const trimmedTeamName = teamName.trim();
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      const trimmedGoals = parseInt(goals.trim(), 10);
      const trimmedAssists = parseInt(assists.trim(), 10);

      // Check if the team exists
      let team = Teams.collection.findOne({ name: trimmedTeamName });

      // If the team doesn't exist, create a new one
      if (!team) {
        Teams.collection.insert({
          owner: this.userId,
          createdAt: new Date(),
          name: trimmedTeamName,
          win: 0, // Default values, adjust as needed
          loss: 0, // Default values, adjust as needed
        });

        // Find the team again to get the _id
        team = Teams.collection.findOne({ name: trimmedTeamName });
      }

      // Insert the player
      Players.collection.insert({
        owner: this.userId,
        createdAt: new Date(),
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        team: team._id,
        goals: trimmedGoals,
        assists: trimmedAssists,
        dateOfBirth: new Date(), // Default value, adjust as needed
        position: 'Unknown', // Default value, adjust as needed
        // Other fields like 'position', 'dateOfBirth', etc. would need to be handled accordingly
      });
    });
  },
});
