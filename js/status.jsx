/** @jsx React.DOM */
var Controls = require('./controls'),
    React = require('react'),
    Fluxxor = require("fluxxor"),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
    mixins: [FluxChildMixin, StoreWatchMixin("status")],

    componentDidMount: function() {
        setInterval(this.getFlux().actions.status.getPlaylist, 5000);
        setInterval(this.getFlux().actions.status.getPlayerProperties, 1000);
    },


    msToTime: function(duration) {
        var milliseconds = parseInt((duration%1000)/100),
            seconds = parseInt((duration/1000)%60),
            minutes = parseInt((duration/(1000*60))%60),
            hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return minutes + ":" + seconds;
    },


    getMillisecondsFromTime: function(time) {
        var ms = time.milliseconds;

        ms = ms + time.seconds * 1000;
        ms = ms + time.minutes * 60000;

        return ms;
    },


    getStateFromFlux: function() {
        return this.getFlux().store("status").getState();
    },


    render: function() {
        var time = '',
            nowPlayingTxt = 'Nothing Playing...',
            track = this.state.currentTrack,
            nowPlaying = this.state.nowPlaying;

        if(track && track.title) {
            var artist = track.artist.length > 0 ? track.artist[0] : 'Unknown Artist';
            nowPlayingTxt = artist + ' - ' + track.album + ' - ' + track.title;
        }

        if(nowPlaying && nowPlaying.time) {
            time = this.msToTime(this.getMillisecondsFromTime(nowPlaying.time)) + '/' + this.msToTime(this.getMillisecondsFromTime(nowPlaying.maxTime));
        }

        return <section className="status">{nowPlayingTxt} {time} <Controls isPlaying={this.state.isPlaying} /></section>
    }
});