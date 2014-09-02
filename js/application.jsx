/** @jsx React.DOM */

var React = require('react'),
    Fluxxor = require('fluxxor'),
    Status = require('./status'),
    Loading = require('./loading'),
    Menu = require('./menu'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

require('../css/main.css');

module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("albumStore")],

    getStateFromFlux: function() {
        return this.getFlux().store("albumStore").getState();
    },
    
    componentDidMount: function() {     
        this.getFlux().actions.initialize();
    },


    render: function() {
        var active = this.props.activeRouteHandler({albums: this.state.albums});
        return <div>
            <Loading loading={this.state.loading} />
            <Status currentTrack={this.state.currentTrack} nowPlaying={this.state.nowPlaying} isPlaying={this.state.isPlaying} />
            {active}
            <Menu />
        </div>
    }
});