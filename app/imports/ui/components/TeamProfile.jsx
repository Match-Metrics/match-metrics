import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';

const TeamProfile = ({ team }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTextLength = 150;
  const handleToggle = () => setIsExpanded(!isExpanded);

  const truncateText = (text) => {
    if (text.length > maxTextLength) {
      return `${text.substring(0, maxTextLength)}...`;
    }
    return text;
  };
  const textContainerStyle = {
    minHeight: '150',
  };
  return (
    <Card className="h-100" style={{ backgroundColor: 'white', border: 'none' }}>
      <Card.Header style={{ paddingBottom: '1em', backgroundColor: 'white', border: 'none' }}>
        <Image src={team.picture} width={275} height={200} style={{ borderRadius: '50%' }} />
        <Card.Title style={{ fontWeight: 'bold', paddingTop: '10px' }}>{team.name}</Card.Title>
        <Card.Subtitle style={{ color: 'gray' }}>Win/Loss: {team.win}/{team.loss}</Card.Subtitle>
      </Card.Header>
      <Card.Body className="py-1" style={{ backgroundColor: 'white' }}>
        <Card.Text style={textContainerStyle}>
          {isExpanded ? team.details : truncateText(team.details)}
        </Card.Text>
        {team.details > maxTextLength && (
          <Button onClick={handleToggle} variant="link" style={{ color: 'black' }}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
        <Card.Text style={textContainerStyle}>
          {isExpanded ? team.achievements : truncateText(team.achievements)}
        </Card.Text>
        {team.achievements > maxTextLength && (
          <Button onClick={handleToggle} variant="link" style={{ color: 'black' }}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

TeamProfile.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
    win: PropTypes.number,
    loss: PropTypes.number,
    picture: PropTypes.string,
    details: PropTypes.string,
    achievements: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default TeamProfile;
