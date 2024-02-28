import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const StatsTable = ({ players }) => {
  const [columnHeader, setColumnHeader] = useState(null);
  const [orderOfSort, setOrderOfSort] = useState('ascending');

  const columnClickHandler = (column) => {
    if (columnHeader === column) {
      setOrderOfSort(
        orderOfSort === 'ascending' ? 'descending' : 'ascending',
      );
    } else {
      setColumnHeader(column);
      setOrderOfSort('ascending');
    }
  };

  const sortedData = players.sort((a, b) => {
    if (columnHeader) {
      if (a[columnHeader] < b[columnHeader]) return orderOfSort === 'ascending' ? -1 : 1;
      if (a[columnHeader] > b[columnHeader]) return orderOfSort === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Table
      bordered
      hover
      size="sm"
      style={{ maxWidth: 800, margin: 'auto' }}
    >
      <thead>
        <tr>
          <th
            width={4}
            style={{ cursor: 'pointer', pointerEvents: 'none' }}
            onClick={() => columnClickHandler('lastName')}
          >
            <span
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
            >
              Last Name
            </span>
          </th>
          <th width={4}>First Name</th>
          <th width={2}>Position</th>
          <th
            width={4}
            style={{ cursor: 'pointer', pointerEvents: 'none' }}
            onClick={() => columnClickHandler('stat1')}
          >
            <span
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
            >
              Stat 1
            </span>
          </th>
          <th
            width={4}
            style={{ cursor: 'pointer', pointerEvents: 'none' }}
            onClick={() => columnClickHandler('stat2')}
          >
            <span
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
            >
              Stat 2
            </span>
          </th>
          <th
            width={4}
            style={{ cursor: 'pointer', pointerEvents: 'none' }}
            onClick={() => columnClickHandler('stat3')}
          >
            <span
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
            >
              Stat 3
            </span>
          </th>
          <th
            width={4}
            style={{ cursor: 'pointer', pointerEvents: 'none' }}
            onClick={() => columnClickHandler('stat4')}
          >
            <span
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
            >
              Stat 4
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item}>
            <td>{item.lastName}</td>
            <td>{item.firstName}</td>
            <td>{item.position}</td>
            <td>{item.stat1}</td>
            <td>{item.stat2}</td>
            <td>{item.stat3}</td>
            <td>{item.stat4}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

StatsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  players: PropTypes.array.isRequired,
};

export default StatsTable;
