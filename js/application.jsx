/** @jsx React.DOM */

var React = require('react'),
    Fluxxor = require('fluxxor'),
    Status = require('./status'),
    Loading = require('./loading'),
    Menu = require('./menu'),
    FluxMixin = Fluxxor.FluxMixin(React);

require('../css/main.css');

module.exports = React.createClass({
    mixins: [FluxMixin],

    
    componentDidMount: function() {     
        this.getFlux().actions.initialize();
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