/** @jsx React.DOM */

var React = require('react'),
    Flux = require('./flux'),
    StoreWatchMixin = require("./store-watch-mixin");

require('../css/loading.css');

module.exports = React.createClass({

    mixins: [StoreWatchMixin("status")],

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.isLoading !== this.state.isLoading;
    },

    getStateFromFlux: function() {
        var store = Flux.store("status").getState();

        return {
            isLoading: store.isLoading,
            message: store.loadingMsg
        }
    },

    render: function() {
        var loading = null;

        if(this.state.isLoading) {
            loading = <div className="loadingContainer"><div className="loading"></div><p>{this.state.message}</p></div>
        }

        return loading
    }
});