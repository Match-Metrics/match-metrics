import React from 'react';
import PropTypes from 'prop-types';

const Event = ({ event, team1Picture, team2Picture }) => {
  const containerStyle = {
    height: '500px',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  };

  const teamStyle = {
    flex: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...teamStyle, backgroundImage: `url(${team1Picture})` }} />
      <div style={{ ...teamStyle, backgroundImage: `url(${team2Picture})` }} />
      <div style={overlayStyle}>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>Location: {event.location ? `${event.location.lat}, ${event.location.lng}` : 'Not specified'}</p>
        <p>Time: {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
        <p>Event Type: {event.eventType}</p>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    eventType: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  team1Picture: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  team2Picture: PropTypes.string,
};

export default Event;
