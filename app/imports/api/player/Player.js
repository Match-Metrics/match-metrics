import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The PlayersCollection. It encapsulates state and variable values for player.
 */
class PlayersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PlayersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      createdAt: Date,
      picture: {
        type: String,
        optional: true,
      },
      firstName: {
        type: String,
        max: 25,
      },
      lastName: {
        type: String,
        max: 25,
      },
      dateOfBirth: {
        type: Date,
      },
      position: {
        type: String,
        allowedValues: [
          'Goalkeeper',
          'Left Back',
          'Right Back',
          'Center Back',
          'Defensive Midfield',
          'Central Midfield',
          'Attacking Midfield',
          'Left Midfield',
          'Right Midfield',
          'Left Wing',
          'Right Wing',
          'Forward',
          'Striker',
          'Center Forward',
          'Wing Back',
        ],
      },
      team: {
        type: String,
        max: 25,
      },
      height: {
        // CM (centimeters)
        type: Number,
        optional: true,
      },
      weight: {
        // LB (pounds)
        type: Number,
        optional: true,
      },
      skills: {
        type: String,
        optional: true,
      },
      achievements: {
        type: String,
        optional: true,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the PlayersCollection.
 * @type {PlayersCollection}
 */
export const Players = new PlayersCollection();
