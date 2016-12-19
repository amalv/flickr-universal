import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { store } from './components/Store';
import Layout from './components/layout';
import Home from './components/home';
import Gallery from './components/gallery';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} onEnter={() => store.dispatch({ type: 'RESET' })} />
    <Route path="/gallery/:user" component={Gallery} />
  </Route>
);

export default routes;
