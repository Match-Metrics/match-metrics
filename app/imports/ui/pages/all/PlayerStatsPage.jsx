import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Table, Button } from 'react-bootstrap';
import StatsTable from '../../components/StatsTable';

// Add in player number to Player later
const PlayerStatsPage = () => {
  const samplePlayers = [
    {
      number: '1',
      firstName: 'Bobby',
      lastName: 'D',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '2.0',
      stat3: '3.0',
      stat4: '4.0',
    },
    {
      number: '2',
      firstName: 'Alex',
      lastName: 'V',
      position: 'Striker',
      stat1: '5.0',
      stat2: '6.0',
      stat3: '6.0',
      stat4: '8.0',
    },
    {
      number: '3',
      firstName: 'Turner',
      lastName: 'A',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '4',
      firstName: 'Charlie',
      lastName: 'K',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '5',
      firstName: 'Bobby',
      lastName: 'A',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '6',
      firstName: 'Alex',
      lastName: 'C',
      position: 'Striker',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '7',
      firstName: 'Bobby',
      lastName: 'Y',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '8',
      firstName: 'Charlie',
      lastName: 'Z',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '9',
      firstName: 'Bobby',
      lastName: 'I',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '10',
      firstName: 'Alex',
      lastName: 'K',
      position: 'Striker',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '11',
      firstName: 'Bobby',
      lastName: 'D',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '12',
      firstName: 'Charlie',
      lastName: 'S',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '13',
      firstName: 'Bobby',
      lastName: 'Q',
      position: 'Goalkeeper',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '14',
      firstName: 'Alex',
      lastName: 'F',
      position: 'Striker',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '15',
      firstName: 'Bobby',
      lastName: 'M',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
    {
      number: '16',
      firstName: 'Charlie',
      lastName: 'S',
      position: 'Left Midfield',
      stat1: '1.0',
      stat2: '1.0',
      stat3: '1.0',
      stat4: '1.0',
    },
  ];

  const [sortedlist, setList] = useState([]);
  const navigate = useNavigate();

  const sortList = (listToSort) => listToSort.sort((a, b) => {
    const numCompare = a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase().localeCompare());
    if (numCompare !== 0) return numCompare;
    return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
  });

  const handleEvent = () => {
    navigate('/addplayer');
  };

  useEffect(() => {
    setList(sortList(samplePlayers));
  }, [samplePlayers]);

  return (
    <Container className="stats-page">
      <Row style={{ paddingBottom: 15 }}>
        <h3 className="text-center">Player Stats - Team 1</h3>
      </Row>
      <div className="row justify-content-center">
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
              <th width={2}>#</th>
              <th width={2}>Name</th>
              <th width={2}>Position(s)</th>
              <th width={2}>Stat 1</th>
              <th width={2}>Stat 2</th>
              <th width={2}>Stat 3</th>
              <th width={2}>Stat 4</th>
            </tr>
          </thead>
          <tbody>
            {sortedlist.map((player => <StatsTable key={player.lastName} players={player} />))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default PlayerStatsPage;
