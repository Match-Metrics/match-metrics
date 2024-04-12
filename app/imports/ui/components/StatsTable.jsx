import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Players } from '../../api/player/Player';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const StatsTable = ({ players }) => {
  const removeItem = (docID) => {
    const subscription = Meteor.subscribe(Players.userPublicationName);
    subscription.ready();
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this player!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Players.collection.remove(docID, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Player removed successfully', 'success')));
        } else {
          swal('Cancelled deletion');
        }
      });
  };
  return (
    <tr>
      <td>{players.lastName}, {players.firstName}</td>
      <td>{players.position}</td>
      <td>{players.goals}</td>
      <td>{players.assists}</td>
      <td>
        <td>
          <Button
            id={`edit-${players._id}`}
            variant="outline-primary"
          >
            <Link to={`/editplayer/${players._id}`}>Edit</Link>
          </Button>
        </td>
      </td>
      <td>
        <div className="justify-content-center">
          <Button
            size="sm"
            variant="outline-danger"
            style={{
              maxWidth: 150,
              position: 'right',
            }}
            onClick={() => removeItem(players._id)}
          >
            Remove Player
          </Button>
        </div>
      </td>
    </tr>
  );
};

StatsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  players: PropTypes.object.isRequired,
};

export default StatsTable;
