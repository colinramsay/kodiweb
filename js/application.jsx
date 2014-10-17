/** @jsx React.DOM */

var React = require('react'),
    Status = require('./status'),
    Loading = require('./loading'),
    Menu = require('./menu'),
    Flux = require('./flux');

require('../css/main.css');

module.exports = React.createClass({
    
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