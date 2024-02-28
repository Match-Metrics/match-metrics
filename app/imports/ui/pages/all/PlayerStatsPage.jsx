import React from 'react';
import { Container, Row } from 'react-bootstrap';
import StatsTable from '../../components/StatsTable';

// Add in player number to Player later
const PlayerStatsPage = () => {
  const samplePlayers = [
    {
      firstName: 'Bobby',
      lastName: 'Test',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '2.0',
      stat3: '3.0',
      stat4: '4.0',
    },
    {
      firstName: 'Alex',
      lastName: 'Test',
      position: 'Striker',
      stat1: '5.0',
      stat2: '6.0',
      stat3: '6.0',
      stat4: '8.0',
    },
    {
      firstName: 'Bobby',
      lastName: 'Last',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Charlie',
      lastName: 'Charger',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Bobby',
      lastName: 'Test',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Alex',
      lastName: 'Test',
      position: 'Striker',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Bobby',
      lastName: 'Last',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Charlie',
      lastName: 'Charger',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Bobby',
      lastName: 'Test',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Alex',
      lastName: 'Test',
      position: 'Striker',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Bobby',
      lastName: 'Last',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Charlie',
      lastName: 'Charger',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Bobby',
      lastName: 'Test',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Alex',
      lastName: 'Test',
      position: 'Striker',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Bobby',
      lastName: 'Last',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      firstName: 'Charlie',
      lastName: 'Charger',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
  ];

  return (
    <Container className="stats-page">
      <Row style={{ paddingBottom: 15 }}>
        <h3 className="text-center">Player Stats - Team 1</h3>
      </Row>
      <Row style={{ paddingBottom: 50 }}>
        <StatsTable players={samplePlayers} />
      </Row>
    </Container>
  );
};

export default PlayerStatsPage;
