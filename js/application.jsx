/** @jsx React.DOM */

var React = require('react'),
    Fluxxor = require('fluxxor'),
    Status = require('./status'),
    Albums = require('./albums'),
    Loading = require('./loading'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("albumStore")],

    getStateFromFlux: function() {
        var store = this.getFlux().store("albumStore");
        return {
            albums: store.albums,
            loading: store.loading
        };
    },
    
    componentDidMount: function() {     
        this.getFlux().actions.initialize();
    },


    render: function() {
        return <div>
            <Loading loading={this.state.loading} />
            <Status />
            <Albums albums={this.state.albums} />
        </div>
    }
});