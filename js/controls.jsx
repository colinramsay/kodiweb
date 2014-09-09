/** @jsx React.DOM */
var React = require('react'),
    Fluxxor = require('fluxxor'),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    Volume = require('./volume');

require('../css/controls.css');

module.exports = React.createClass({
    mixins: [FluxChildMixin],

    onClick: function() {
        this.getFlux().actions.control[this.props.isPlaying ? 'pause' : 'play']();
    },

    render: function() {
        var txt = this.props.isPlaying ? 'pause' : 'play';
        return <div className="controls"><button onClick={this.onClick}><span className={'fa fa-' + txt}></span></button><Volume /></div>
    }
});