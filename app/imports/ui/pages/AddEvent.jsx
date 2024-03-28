import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import FileField from '../components/FileField';
import { Events } from '../../api/event/Event';

const bridge = new SimpleSchema2Bridge(Events.schema);

const AddEvent = () => {
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState(null); // Added for location handling
  let fRef = null;
  const user = Meteor.user();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGooglePlacesScript = document.createElement('script');
    loadGooglePlacesScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAhjUj42pjiQrYx901CaaCvXzEzD6CvCoo&libraries=places';
    document.body.appendChild(loadGooglePlacesScript);

    loadGooglePlacesScript.onload = () => {
      // eslint-disable-next-line no-use-before-define
      initializeAutocomplete();
    };
  }, []);

  const initializeAutocomplete = () => {
    const input = document.getElementById('event-location');
    // eslint-disable-next-line no-undef
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  };

  const handleAddEvent = () => {
    navigate('/calendar');
  };

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const submit = (data) => {
    const { image, ...eventData } = data;
    // eslint-disable-next-line no-shadow
    const insertEvent = (eventData) => {
      Events.collection.insert({ ...eventData, location }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
          if (fRef) {
            fRef.reset();
          }
          handleAddEvent();
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
            eventData.image = imageUrl;
            insertEvent(eventData);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      insertEvent(eventData);
    }
  };

  return (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col xs={6}>
            <Col className="text-center"><h2>Add Event</h2></Col>
            <Col>
              <Button variant="link" size="sm" onClick={handleAddEvent}>Back to Calendar</Button>
            </Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data)}>
              <Card style={{ backgroundColor: 'white', border: 'none' }}>
                <Card.Body>
                  <TextField inputClassName="border-dark" name="title" />
                  <LongTextField inputClassName="border-dark" name="description" />
                  {/* Updated TextField for location */}
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="event-location">Location</label>
                  <input type="text" id="event-location" className="form-control border-dark" />
                  <DateField inputClassName="border-dark" name="startTime" />
                  <DateField inputClassName="border-dark" name="endTime" />
                  <TextField inputClassName="border-dark" name="teams1" />
                  <TextField inputClassName="border-dark" name="teams2" />
                  <SelectField inputClassName="border-dark" name="eventType" />
                  <div className="mb-3">
                    <FileField name="image" onChange={handleImageChange} />
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

export default AddEvent;
