import { Meteor } from 'meteor/meteor';
import cloudinary from 'cloudinary';
import { Storage } from '@google-cloud/storage';
import { VideoIntelligenceServiceClient } from '@google-cloud/video-intelligence';

cloudinary.config({
  cloud_name: 'YOUR-KEY-HERE',
  api_key: 'YOUR-KEY-HERE',
  api_secret: 'YOUR-KEY-HERE',
});

const storage = new Storage({
  keyFilename: 'YOUR-PATH',
});
const bucketName = 'YOUR-BUCKET';

const videoIntelligenceClient = new VideoIntelligenceServiceClient({
  keyFilename: 'YOUR-PATH',
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

  // eslint-disable-next-line meteor/audit-argument-checks
  async uploadVideo(videoData) {
    this.unblock();

    try {
      // Specify the resource_type as 'video' to ensure Cloudinary handles it as a video
      const result = await cloudinary.v2.uploader.upload(videoData, { resource_type: 'video' });
      return result.secure_url;
    } catch (error) {
      throw new Meteor.Error('cloudinary-upload-failed', 'Error uploading video to Cloudinary');
    }
  },

  // eslint-disable-next-line meteor/audit-argument-checks
  async uploadAndAnalyzeVideo(base64Data, fileName) {
    this.unblock();
    try {
      // Upload the video to GCS
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
      const buffer = Buffer.from(base64Data, 'base64');
      await file.save(buffer, {
        resumable: false,
        metadata: { contentType: 'video/mp4' },
      });
      const videoGcsUri = `gs://${bucketName}/${fileName}`;
      const request = {
        inputUri: videoGcsUri,
        features: ['LABEL_DETECTION', 'SHOT_CHANGE_DETECTION', 'EXPLICIT_CONTENT_DETECTION'],
      };
      const [operation] = await videoIntelligenceClient.annotateVideo(request);
      const [analysisResult] = await operation.promise();
      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      return { videoUrl: publicUrl, analysisResult };
    } catch (error) {
      console.error('Error processing video:', error);
      throw new Meteor.Error('video-processing-failed', 'Failed to upload and analyze video');
    }
  },
});
