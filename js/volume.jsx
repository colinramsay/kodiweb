/** @jsx React.DOM */

var React = require('react');
    Fluxxor = require('fluxxor'),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
    mixins: [FluxChildMixin, StoreWatchMixin('status')],

    componentDidMount: function() {
        setInterval(this.getFlux().actions.status.getAppProperties, 5000);
    },

	getStateFromFlux: function() {
        var store = this.getFlux().store('status');

		return {
			volume: store.volume,
            isMuted: store.isMuted
		}
	},

    onChange: function(event) {

    },

	render: function() {
		return <div>
            <p>{this.state.isMuted ? 'muted' : 'unmuted'}</p>
            <input min="0" max="100" type="range" onChange={this.onChange} value={this.state.volume} />
        </div>
	}
});