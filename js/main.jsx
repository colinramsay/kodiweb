/** @jsx React.DOM */

var React = require('react'),
    Flux = require('./flux');

var Router = require('react-router'),
    Route = Router.Route,
    Routes = Router.Routes,
    DefaultRoute = Router.DefaultRoute;

var Status = require('./status'),
    Loading = require('./loading'),
    Menu = require('./menu'),
    Albums = require('./albums');

require('../css/main.css');


var Application = React.createClass({
    
    componentDidMount: function() {     
        Flux.actions.control.initialize();
    },

    render: function() {
        var active = this.props.activeRouteHandler();
        return <div>
            <Loading />
            <Status />
            {active}
            <Menu />
        </div>
    }
});


var routes = (
    <Routes>
        <Route handler={Application}>
            <DefaultRoute handler={Albums}/>
        </Route>
    </Routes>
);


React.renderComponent(routes, document.getElementById('app-root'));