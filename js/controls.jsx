/** @jsx React.DOM */
var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    Volume = require('./volume');

module.exports = React.createClass({
    mixins: [FluxChildMixin],

    onClick: function() {
        this.getFlux().actions.control[this.props.isPlaying ? 'pause' : 'play']();
    },

    render: function() {
        var txt = this.props.isPlaying ? 'Pause' : 'Play';
        return <div><button onClick={this.onClick}>{txt}</button><Volume /></div>
    }
});