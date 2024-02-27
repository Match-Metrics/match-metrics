import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Teams } from '../../api/team/Team';
import TeamProfile from '../components/TeamProfile';

const TeamPage = () => {
  const profilesPerPage = 9;
  const profilesPerRow = 3;
  const [activePage, setActivePage] = useState(1);

  const { ready, teams } = useTracker(() => {
    const subscription = Meteor.subscribe(Teams.userPublicationName);
    const rdy = subscription.ready();
    const teamItems = Teams.collection.find({}).fetch();
    return {
      teams: teamItems,
      ready: rdy,
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastProfile = activePage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentTeams = teams.slice(indexOfFirstProfile, indexOfLastProfile);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(teams.length / profilesPerPage); i++) {
    pageNumbers.push(i);
  }

  return ready ? (
    <div>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={10}>
            <Col className="text-center">
              <h1 style={{ marginBottom: '1em', marginTop: '1em', fontWeight: 'bold' }}>Meet Our Teams</h1>
            </Col>
            <Row xs={1} md={2} lg={profilesPerRow} className="g-5">
              {currentTeams.map((team) => (
                <Col key={team.owner}>
                  <TeamProfile team={team} />
                </Col>
              ))}
            </Row>
            {pageNumbers.length > 1 && (
              <Pagination className="justify-content-center mt-3">
                {pageNumbers.map(number => (
                  <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default TeamPage;
