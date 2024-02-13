import { Meteor } from 'meteor/meteor';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'djoahlpoc',
  api_key: '513547556632438',
  api_secret: 'Fp6cEWLBdbmAfrQlshHfA-jOgXs',
});

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  async uploadImage(imageData) {
    this.unblock();

    try {
      const result = await cloudinary.v2.uploader.upload(imageData, { resource_type: 'auto' });
      return result.secure_url;
    } catch (error) {
      throw new Meteor.Error('cloudinary-upload-failed', 'Error uploading to Cloudinary');
    }
  },
});
