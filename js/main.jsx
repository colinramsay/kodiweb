/** @jsx React.DOM */

var React = require('react'),
    Application = require('./application'),
    Albums = require('./albums');

var Router = require('react-router'),
    Route = Router.Route,
    Routes = Router.Routes,
    DefaultRoute = Router.DefaultRoute;

function onError(error) {
    console.error(error);
}

var routes = (
  <Routes>
    <Route handler={Application}>
      <DefaultRoute handler={Albums}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.getElementsByClassName('media')[0]);