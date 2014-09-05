/** @jsx React.DOM */

var React = require('react');
    Fluxxor = require('fluxxor'),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
    mixins: [FluxChildMixin, StoreWatchMixin('status')],

    componentDidMount: function() {
        this.startMonitoring();
    },

    startMonitoring: function() {
        console.debug('Volume monitoring started.');
        this.monitorInterval = setInterval(this.getFlux().actions.status.getAppProperties, 5000);
    },

    stopMonitoring: function() {
        console.debug('Volume monitoring stopped.');
        clearInterval(this.monitorInterval);
    },

	getStateFromFlux: function() {
        var store = this.getFlux().store('status');

		return {
			volume: store.volume,
            isMuted: store.isMuted
		}
	},

    onChange: function(event) {
        var vol = event.target.value;
        this.getFlux().actions.control.setVolume(vol);
        this.setState({volume: vol});
    },

	render: function() {
		return <div>
            <p>{this.state.isMuted ? 'muted' : 'unmuted'}</p>
            <input min="0" max="100" type="range" step="1" onMouseDown={this.stopMonitoring} onMouseUp={this.startMonitoring} onChange={this.onChange} value={this.state.volume} />
        </div>
	}
});