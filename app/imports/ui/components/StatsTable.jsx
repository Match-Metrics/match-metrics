import React from 'react';
import PropTypes from 'prop-types';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const StatsTable = ({ players }) => (
  <tr>
    <td>#{players.number}</td>
    <td>{players.lastName}, {players.firstName}</td>
    <td>{players.position}</td>
    <td>{players.stat1}</td>
    <td>{players.stat2}</td>
    <td>{players.stat3}</td>
    <td>{players.stat4}</td>
  </tr>
);

StatsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  players: PropTypes.array.isRequired,
};

export default StatsTable;
