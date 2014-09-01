/** @jsx React.DOM */
var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxChildMixin = Fluxxor.FluxChildMixin(React);

module.exports = React.createClass({
    mixins: [FluxChildMixin],

    onClick: function() {
        this.getFlux().actions[this.props.isPlaying ? 'pause' : 'play']();
    },

    render: function() {
        var txt = this.props.isPlaying ? 'Pause' : 'Play';
        return <button onClick={this.onClick}>{txt}</button>
    }
});