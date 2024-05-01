import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import FileField from '../components/FileField';
import { Players } from '../../api/player/Player'; // Adjust the import path as necessary

const bridge = new SimpleSchema2Bridge(Players.schema);

const AddPlayer = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;
  const user = Meteor.user();
  const navigate = useNavigate();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const handleAddEvent1 = () => {
    navigate('/stats');
  };
  const handleAddEvent2 = () => {
    navigate('/team-management');
  };

  const submit = (data) => {
    const { picture, ...playerData } = data;
    // eslint-disable-next-line no-shadow
    const insertPlayer = (playerData) => {
      Players.collection.insert({ ...playerData }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Player added successfully', 'success');
          if (fRef) {
            fRef.reset();
          }
          navigate('/stats'); // Go to stats page
        }
      });
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const fileData = reader.result;
        Meteor.call('uploadImage', fileData, (err, imageUrl) => {
          if (err) {
            swal('Error', 'Failed to upload image.', 'error');
          } else {
            playerData.picture = imageUrl;
            insertPlayer(playerData);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      insertPlayer(playerData);
    }
  };

  return (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={5}>
            <Col className="text-center"><h2>Add Player</h2></Col>
            <Col className="text-center">
              <Button variant="link" size="sm" onClick={handleAddEvent1}>Back to Stats</Button>
              <Button variant="link" size="sm" onClick={handleAddEvent2}>Add Multiple Players from PDF</Button>
            </Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data)}>
              <Card style={{ backgroundColor: 'white', border: 'none' }}>
                <Card.Body>
                  <TextField inputClassName="border-dark" name="firstName" />
                  <TextField inputClassName="border-dark" name="lastName" />
                  <DateField inputClassName="border-dark" name="dateOfBirth" />
                  <SelectField inputClassName="border-dark" name="position" />
                  <TextField inputClassName="border-dark" name="team" />
                  <NumField inputClassName="border-dark" name="height" label="Height (in)" />
                  <NumField inputClassName="border-dark" name="weight" label="Weight (lbs)" />
                  <TextField inputClassName="border-dark" name="skills" />
                  <TextField inputClassName="border-dark" name="achievements" />
                  <TextField inputClassName="border-dark" name="goals" />
                  <TextField inputClassName="border-dark" name="assists" />
                  <div className="mb-3">
                    <FileField name="picture" onChange={handleImageChange} />
                  </div>
                  <ErrorsField />
                  <SubmitField inputClassName="p-2 bg-white border-1 rounded-1 mt-1" value="Submit" />
                  <HiddenField name="createdAt" value={new Date()} />
                  <HiddenField name="owner" value={user.username} />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPlayer;
