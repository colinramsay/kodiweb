/** @jsx React.DOM */

var React = require('react'),
    AlbumStore = require('./album-store'),
    StatusStore = require('./status-store'),
    Fluxxor = require('fluxxor'),
    Application = require('./application'),
    Albums = require('./albums');

var Router = require('react-router'),
    Route = Router.Route,
    Routes = Router.Routes,
    DefaultRoute = Router.DefaultRoute;

var actions = {
    album: require('./album-actions'),
    status: require('./status-actions'),
    control: require('./control-actions')
};

var stores = {
    album: new AlbumStore(),
    status: new StatusStore()
};

var flux = new Fluxxor.Flux(stores, actions);

function onError(error) {
    console.error(error);
}

var routes = (
  <Routes>
    <Route handler={Application} flux={flux}>
      <DefaultRoute handler={Albums}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.getElementsByClassName('media')[0]);