import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';

const VideoProcess = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const submitVideo = async () => {
    if (!videoFile) {
      swal('Please select a video to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/analyze-video', {
        method: 'POST',
        body: formData,
      });
      setLoading(false);

      // eslint-disable-next-line no-unused-vars
      const result = await response.json();
      swal('Video processed successfully!, Video can be found in same path as uploaded video.');
    } catch (error) {
      setLoading(false);
      swal('Failed to process the video.');
    }
  };

  return (
    <div>
      <Container style={{ width: '70%' }}>
        <Row className="justify-content-center">
          <Col style={{ maxWidth: '800px' }} className="text-center p-4">
            <Container className="m-5">
              <h1 style={{ fontSize: 60, fontWeight: 'bold' }}>Soccer Video Analysis</h1>
              <h3 style={{ marginTop: '1em', fontWeight: 'lighter', color: 'gray' }}>Process your video with player and ball detection along with ball path, receive a video in minimal time!</h3>
            </Container>
            <h5 style={{ marginBottom: '50px', fontSize: 15 }}>Powered by Match Metrics</h5>
            <div>
              <input type="file" onChange={handleVideoChange} />
              <Button style={{ borderColor: 'black', margin: 10, color: 'black', background: 'white' }} onClick={submitVideo}>Generate</Button>
              {loading && <Spinner animation="border" />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VideoProcess;
