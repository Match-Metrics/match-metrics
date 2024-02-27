import React, { useState, useRef } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow } from '@react-google-maps/api';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/Event';

const containerStyle = {
  width: '100%',
  height: '800px',
};

const center = {
  lat: 21.3099,
  lng: -157.8581,
};

const MapSearch = () => {
  const [mapOptions, setMapOptions] = useState({
    center: center,
    zoom: 12,
    mapTypeId: 'hybrid',
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);
  const searchBoxRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const { events, eventsReady } = useTracker(() => {
    const subscription = Meteor.subscribe(Events.userPublicationName);
    const rdy = subscription.ready();
    const eventItems = Events.collection.find({}).fetch();
    return {
      events: eventItems,
      eventsReady: rdy,
    };
  }, []);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const latLng = place.geometry.location;
      setMapOptions(prevOptions => ({ ...prevOptions, center: latLng }));
    }
  };

  const geocodeLatLng = (geocoder, location) => {
    geocoder.geocode({ location: location }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setSelectedAddress(results[0].formatted_address);
        } else {
          console.log('No results found');
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR-KEY-HERE"
      libraries={['places']}
      onLoad={() => setIsMapScriptLoaded(true)}
    >
      {isMapScriptLoaded && eventsReady && (
        <div>
          <div className="search-box-container">
            {/* eslint-disable-next-line no-return-assign */}
            <StandaloneSearchBox onLoad={(ref) => searchBoxRef.current = ref} onPlacesChanged={onPlacesChanged}>
              <input
                type="text"
                placeholder="Search for places"
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid transparent',
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: '3px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                  fontSize: '14px',
                  outline: 'none',
                  textOverflow: 'ellipses',
                }}
              />
            </StandaloneSearchBox>
          </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            options={mapOptions}
          >
            {events.map((event) => (
              <Marker
                key={event._id}
                position={event.location}
                title={event.name}
                onClick={() => {
                  setSelectedEvent(event);
                  const geocoder = new window.google.maps.Geocoder();
                  geocodeLatLng(geocoder, event.location);
                }}
              />
            ))}
            {selectedEvent && (
              <InfoWindow
                position={selectedEvent.location}
                onCloseClick={() => {
                  setSelectedEvent(null);
                  setSelectedAddress('');
                }}
              >
                <div>
                  <h5>{selectedEvent.name}</h5>
                  <h6>Event Type: {selectedEvent.eventType}</h6>
                  <h6>Address: {selectedAddress}</h6>
                  <p>{selectedEvent.description}</p>
                  <Button size="sm">
                    More Details
                  </Button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}
    </LoadScript>
  );
};

export default MapSearch;
