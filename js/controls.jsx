/** @jsx React.DOM */
var React = require('react'),
    Flux = require('./flux'),
    Volume = require('./volume');

require('../css/controls.css');

module.exports = React.createClass({

    onClick: function() {
        Flux.actions.control[this.props.isPlaying ? 'pause' : 'play']();
    },

    render: function() {
        var txt = this.props.isPlaying ? 'pause' : 'play';
        return <div className="controls"><button onClick={this.onClick}><span className={'fa fa-' + txt}></span></button><Volume /></div>
    }
});