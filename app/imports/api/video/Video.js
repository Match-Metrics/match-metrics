import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class VideosCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VideosCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      video: {
        type: String,
        optional: true,
      },
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Videos = new VideosCollection();
