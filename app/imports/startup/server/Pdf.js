import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import pdfParse from 'pdf-parse';

Meteor.methods({
  'files.upload'(file) {
    check(file, Object);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Convert the file from base64 to a Buffer
    const buffer = Buffer.from(file.content, 'base64');

    pdfParse(buffer).then(data => {
      // `data.text` contains the extracted text from the PDF
      console.log(data.text);

    }).catch(err => {
      throw new Meteor.Error('PDF parsing failed', err.message);
    });
  },
});
