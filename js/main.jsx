/** @jsx React.DOM */

var React = require('react'),
    AlbumStore = require('./store'),
    StatusStore = require('./status-store'),
    actions = require('./actions'),
    Fluxxor = require('fluxxor'),
    Application = require('./application'),
    Albums = require('./albums');

    var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
    
var flux = new Fluxxor.Flux({ albumStore: new AlbumStore(), statusStore: new StatusStore() }, actions);

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