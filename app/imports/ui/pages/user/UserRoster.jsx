import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Teams } from '/imports/api/team/Team';
import { Players } from '/imports/api/player/Player';

const UserRoster = () => {
  const { players, team, isLoading } = useTracker(() => {
    const noDataAvailable = { players: [], team: null };
    const user = Meteor.user();
    const teamId = user?.profile?.teamId; // Make sure this path is correct

    const teamHandler = Meteor.subscribe('teamDetails', teamId);
    const playersHandler = Meteor.subscribe('playersByTeam', teamId);

    if (!teamHandler.ready() || !playersHandler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const team = Teams.collection.findOne({ _id: teamId });
    const players = Players.collection.find({ team: teamId }).fetch();
    return { players, team, isLoading: false };
  }, []);

  return (
    <Container id="roster-page" fluid className="p-5">
      {/* Hero Section */}
      <Row className="align-items-center text-center mb-5">
        <Col className="section-padding">
          <div className="text-background">
            <h1 className="high-contrast-text text-shadow">{team ? `Team: ${team.name} Roster` : 'Roster Unavailable'}</h1>
          </div>
        </Col>
      </Row>

      {/* Loading State and Table */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.position}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserRoster;
