import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The EventsCollection. It encapsulates state and variable values for event.
 */
class EventsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'EventsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      createdAt: Date,
      title: {
        type: String,
        max: 100,
      },
      description: {
        type: String,
        optional: true,
        max: 1000,
      },
      location: {
        type: String,
        max: 100,
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
      teams1: {
        type: String,
        optional: true,
      },
      teams2: {
        type: String,
        optional: true,
      },
      eventType: {
        type: String,
        allowedValues: ['Match', 'Training', 'Meeting', 'Other'],
        defaultValue: 'Match',
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the EventsCollection.
 * @type {EventsCollection}
 */
export const Events = new EventsCollection();
