import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import FileField from '../components/FileField';
import { Teams } from '../../api/team/Team'; // Adjust the import path as necessary

const bridge = new SimpleSchema2Bridge(Teams.schema);

const AddTeam = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;
  const user = Meteor.user();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const submit = (data) => {
    const { picture, ...teamData } = data;
    // eslint-disable-next-line no-shadow
    const insertTeam = (teamData) => {
      Teams.collection.insert({ ...teamData }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Team added successfully', 'success');
          if (fRef) {
            fRef.reset();
          }
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
            teamData.picture = imageUrl;
            insertTeam(teamData);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      insertTeam(teamData);
    }
  };

  return (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={5}>
            <Col className="text-center"><h2>Add Team</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data)}>
              <Card style={{ backgroundColor: 'white', border: 'none' }}>
                <Card.Body>
                  <TextField inputClassName="border-dark" name="name" />
                  <NumField inputClassName="border-dark" name="win" />
                  <NumField inputClassName="border-dark" name="loss" />
                  <LongTextField inputClassName="border-dark" name="details" />
                  <LongTextField inputClassName="border-dark" name="achievements" />
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

export default AddTeam;
