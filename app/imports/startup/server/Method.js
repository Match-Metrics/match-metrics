import { Meteor } from 'meteor/meteor';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'YOUR-KEY-HERE',
  api_key: 'YOUR-KEY-HERE',
  api_secret: 'YOUR-KEY-HERE',
});

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  async uploadImage(imageData) {
    this.unblock();

    try {
      const result = await cloudinary.v2.uploader.upload(imageData, { resource_type: 'auto' });
      return result.secure_url;
    } catch (error) {
      console.log(error);
      throw new Meteor.Error('cloudinary-upload-failed', 'Error uploading to Cloudinary');
    }
  },
});
