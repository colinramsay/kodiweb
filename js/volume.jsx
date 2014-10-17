/** @jsx React.DOM */

var React = require('react');
    Flux = require('./flux'),
    StoreWatchMixin = require('./store-watch-mixin');

module.exports = React.createClass({
    mixins: [StoreWatchMixin('status')],

    componentDidMount: function() {
        this.startMonitoring();
    },

    startMonitoring: function() {
        console.debug('Volume monitoring started.');
        this.monitorInterval = setInterval(Flux.actions.status.getAppProperties, 5000);
    },

    stopMonitoring: function() {
        console.debug('Volume monitoring stopped.');
        clearInterval(this.monitorInterval);
    },

	getStateFromFlux: function() {
        var store = Flux.store('status');

		return {
			volume: store.volume,
            isMuted: store.isMuted
		}
	},

    onChange: function(event) {
        Flux.actions.control.setVolume(event.target.value);
    },

    onMuteClick: function(event) {
        this.stopMonitoring();
        Flux.actions.control.setMute(!this.state.isMuted);
    },

	render: function() {
        var icon = this.state.isMuted ? 'down' : 'up';
		return <div>
            <button type="button" onClick={this.onMuteClick}><span className={'fa fa-volume-' + icon}></span></button>
            <input min="0" max="100" type="range" step="1" onMouseDown={this.stopMonitoring} onMouseUp={this.startMonitoring} onChange={this.onChange} value={this.state.volume} />
        </div>
	}
});