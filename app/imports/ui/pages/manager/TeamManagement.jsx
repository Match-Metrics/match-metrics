import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { Teams } from '/imports/api/team/Team';
import { Players } from '/imports/api/player/Player';
import PdfReader from '../../components/PdfReader';

const TeamManagement = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const { teams } = useTracker(() => {
    Meteor.subscribe(Teams.userPublicationName);
    return {
      teams: Teams.collection.find({}).fetch(),
    };
  }, []);

  const { players } = useTracker(() => {
    if (!selectedTeam) return { players: [] };

    Meteor.subscribe(Players.userPublicationName);
    return {
      players: Players.collection.find({ team: selectedTeam._id }).fetch(),
    };
  }, [selectedTeam]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };
  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const binaryStr = reader.result;
        const base64Str = btoa(binaryStr);

        // base64Str is ready to be sent to the server
        const fileData = { content: base64Str };

        // Call Meteor method to send file data to the server
        Meteor.call('files.upload', fileData, (err, res) => {
          if (err) {
            console.error('Error uploading file:', err);
          } else {
            console.log('File uploaded successfully:', res);
            // Handle success
          }
        });
      } else {
        console.error('FileReader did not return a string.');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Container id="roster-page" fluid className="p-5">
      {/* Hero Section */}
      <Row className="align-items-center text-center mb-4">
        <Col className="section-padding">
          <h1 className="high-contrast-text text-shadow">Manage Roster</h1>
        </Col>
      </Row>

      {/* PDF Upload Section */}
      <Row className="justify-content-center mb-4">
        <Col md={6} className="text-center">
          <h2>Upload Player Stats</h2>
          <PdfReader onFileUpload={handleFileUpload} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Teams</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleTeamSelect(team)}>View Players</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {selectedTeam && (
        <Row>
          <Col>
            <h3>Players in {selectedTeam.name}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Goals</th>
                  <th>Assists</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player._id}>
                    <td>{player.firstName} {player.lastName}</td>
                    <td>{player.position}</td>
                    <td>{player.goals}</td>
                    <td>{player.assists}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TeamManagement;
