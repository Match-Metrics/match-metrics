import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { Players } from '../../../api/player/Player';
import StatsTable from '../../components/StatsTable';

// Add in player number to Player later
const PlayerStatsPage = () => {
  const navigate = useNavigate();

  const handleEvent = () => {
    navigate('/addplayer');
  };

  const players = useTracker(() => {
    const subscription = Meteor.subscribe(Players.userPublicationName);
    subscription.ready();
    const playerItems = Players.collection.find({}).fetch();
    return playerItems;
  });

  return (
    <Container className="stats-page">
      <Row style={{ paddingBottom: 15 }}>
        <h3 className="text-center">Player Stats</h3>
      </Row>
      <div className="row justify-content-center">
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Button
            size="sm"
            variant="outline-primary"
            style={{
              maxWidth: 150,
              position: 'right',
            }}
            onClick={handleEvent}
          >
            Add Player
          </Button>
        ) : ''}
      </div>
      <Row style={{ paddingBottom: 50, paddingTop: 15 }}>
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ maxWidth: 800, margin: 'auto' }}
        >
          <thead>
            <tr>
              <th width={2}>Name</th>
              <th width={2}>Position(s)</th>
              <th width={2}>Goals</th>
              <th width={2}>Assists</th>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <th width={2}>Edit Player Info</th>
              ) : ''}
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <th width={2}>Remove Player</th>
              ) : ''}
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <StatsTable key={player._id} players={player} />
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default PlayerStatsPage;
