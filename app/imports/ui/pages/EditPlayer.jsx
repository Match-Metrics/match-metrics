import React from 'react';
import withAllSubscriptions from '../../layouts/AllSubscriptionsHOC';
// import EditToolWidget from '../../components/administrator/EditToolWidget';
import EditPlayer from '../components/EditPlayer';

const EditPlayerPage = () => (
  <EditPlayer />
);

export default withAllSubscriptions(EditPlayerPage);
