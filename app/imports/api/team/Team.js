import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The TeamsCollection. It encapsulates state and variable values for team.
 */
class TeamsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TeamsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      createdAt: Date,
      name: String,
      win: Number,
      loss: Number,
      picture: {
        type: String,
        optional: true,
      },
      details: {
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
 * The singleton instance of the TeamsCollection.
 * @type {TeamsCollection}
 */
export const Teams = new TeamsCollection();
