/** @jsx React.DOM */

var React = require('react');
    Fluxxor = require('fluxxor'),
    FluxChildMixin = Fluxxor.FluxChildMixin(React);

module.exports = React.createClass({
    mixins: [FluxChildMixin],

	getInitialState: function() {
		return {
			volume: 0
		}
	},

	render: function() {
		return <input min="0" max="100" type="range" />
	}
});