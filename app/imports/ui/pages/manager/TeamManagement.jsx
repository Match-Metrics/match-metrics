import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import PdfReader from '../../components/PdfReader'; // Adjust the import path as necessary

const TeamManagement = () => {
  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const binaryStr = reader.result;
        const base64Str = btoa(binaryStr);

        // base64Str is ready to be sent to the server
        const fileData = { content: base64Str };

        // Call Meteor method to send file data to the server
        Meteor.call('files.upload', fileData, (err, res) => {
          if (err) {
            console.error('Error uploading file:', err);
          } else {
            console.log('File uploaded successfully:', res);
            // Handle success
          }
        });
      } else {
        console.error('FileReader did not return a string.');
      }
    };

    reader.readAsBinaryString(file);

  };

  return (
    <Container id="roster-page" fluid className="p-5">
      {/* Hero Section */}
      <Row className="align-items-center text-center mb-5">
        <Col className="section-padding">
          <div className="text-background">
            <h1 className="high-contrast-text text-shadow">Manage Roster</h1>
          </div>
        </Col>
      </Row>

      {/* PDF Upload Section */}
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h2>Upload Player Stats</h2>
          <PdfReader onFileUpload={handleFileUpload} />
        </Col>
      </Row>
    </Container>
  );
};

export default TeamManagement;
