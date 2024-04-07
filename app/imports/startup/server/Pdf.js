// Ensure fetch is available
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import nodeFetch from 'node-fetch';

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
      console.log(data.text);
      const API_KEY = 'AIzaSyB0N-ddxiCEEeAbO7kBQU3662rAkNBKeUE';
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
      const prompt = `Return the full name of the first player from the following text\n${data.text}`;

      try {
        const result = await model.generateContent(prompt);
        const textResponse = await result.response.text();
        console.log(textResponse);

      } catch (err) {
        console.error('Error processing file:', err);
        throw new Meteor.Error('PDF parsing failed', err.message);
      }
    }).catch(err => {
      throw new Meteor.Error('PDF parsing failed', err.message);
    });
  },
});
