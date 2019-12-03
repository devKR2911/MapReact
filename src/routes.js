import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MapsPage from './containers/MapsPage';
import App from './containers/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MapsPage} />{' '}
  </Route>
);
