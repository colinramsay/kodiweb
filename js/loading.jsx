/** @jsx React.DOM */

var React = require('react'),
    Fluxxor = require("fluxxor"),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

require('../css/loading.css');

module.exports = React.createClass({

    mixins: [FluxChildMixin, StoreWatchMixin("status")],

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.isLoading !== this.state.isLoading;
    },

    getStateFromFlux: function() {
        var store = this.getFlux().store("status").getState();

        return {
            isLoading: store.isLoading,
            message: store.loadingMsg
        }
    },

    render: function() {
        var loading = null;

        if(this.state.isLoading) {
            loading = <div className="loadingContainer"><p>{this.state.message}</p><div className="loading"></div></div>
        }

        return loading
    }
});