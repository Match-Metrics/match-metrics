import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
// import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { useParams, useNavigate } from 'react-router';
import { Players } from '../../api/player/Player';

const formSchema = new SimpleSchema2Bridge(Players.schema);
const EditPlayer = () => {
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);

  const { _id } = useParams();
  const { doc } = useTracker(() => {
    const subscription = Meteor.subscribe(Players.userPublicationName);
    subscription.ready();
    const document = Players.collection.findOne({ _id: _id });
    return {
      doc: document,
    };
  });

  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  const submit = (data) => {
    const {
      firstName,
      lastName,
      dateOfBirth,
      position,
      team,
      height,
      weight,
      skills,
      achievements,
      goals,
      assists,
    } = data;

    const id = _id;

    const updateData = {
      id,
      firstName,
      lastName,
      dateOfBirth,
      position,
      team,
      height,
      weight,
      skills,
      achievements,
      goals,
      assists,
    };

    Players.collection.update(
      { _id: updateData.id },
      { $set: { ...updateData } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item edited successfully', 'success');

          setRedirect(true);
        }
      },
    );
  };

  if (redirect) {
    return navigate('/stats');
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  return (
    <Container fluid className="add-edit edit-page" id="edit-player-page">
      <Col>
        <Row className="text-center">
          <h2>Edit Player Info</h2>
        </Row>
        <AutoForm schema={formSchema} onSubmit={data => submit(data)} model={doc}>
          <Container className="teamCreate">
            <Card>
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
                <ErrorsField />
                <Row className="text-center">
                  <Col className="text-end"><SubmitField id="edit-player-submit" value="Submit" /></Col>
                  <Col className="text-start">
                    <Button
                      id="edit-player-cancel"
                      variant="danger"
                      onClick={() => setRedirect(true)}
                    >Cancel
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </AutoForm>
      </Col>
    </Container>
  );
};

export default EditPlayer;
