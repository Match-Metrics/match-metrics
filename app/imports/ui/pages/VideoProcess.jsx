import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import FileField from '../components/FileField';
import { Videos } from '../../api/video/Video';

const bridge = new SimpleSchema2Bridge(Videos.schema);

const VideoProcess = () => {
  const [videoFile, setVideoFile] = useState(null);

  const handleVideoChange = (file) => {
    setVideoFile(file);
  };

  const submit = (formData) => {
    if (videoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        const fileName = videoFile.name;

        Meteor.call('uploadAndAnalyzeVideo', base64Data, fileName, (error, response) => {
          if (error) {
            console.error('Error:', error);
            swal('Error', 'Failed to process video.', 'error');
          } else {
            const { videoUrl, analysisResult } = response;
            console.log(analysisResult);
            console.log(videoUrl);
            // eslint-disable-next-line no-param-reassign
            formData.videoUrl = videoUrl;
            Videos.collection.insert(formData, (insertErr) => {
              if (insertErr) {
                console.error('Insert error:', insertErr);
                swal('Error', 'Failed to save video information.', 'error');
              } else {
                swal('Success', 'Video uploaded, analyzed, and saved successfully.', 'success');
              }
            });
          }
        });
      };
      reader.readAsDataURL(videoFile);
    } else {
      swal('Error', 'Please select a video file.', 'error');
    }
  };

  return (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-3">Submit Video For Analysis</Card.Title>
                <AutoForm schema={bridge} onSubmit={submit}>
                  <FileField name="video" onChange={handleVideoChange} />
                  <ErrorsField />
                  <SubmitField className="mt-2" value="Submit Video" />
                  <HiddenField name="owner" value={Meteor.user()?.username} />
                </AutoForm>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VideoProcess;
