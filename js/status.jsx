/** @jsx React.DOM */
var Controls = require('./controls'),
    React = require('react'),
    Flux = require('./flux'),
    StoreWatchMixin = require('./store-watch-mixin');

module.exports = React.createClass({
    mixins: [StoreWatchMixin("status")],

    componentDidMount: function() {
        setInterval(Flux.actions.status.getPlaylist, 5000);
        setInterval(Flux.actions.status.getPlayerProperties, 1000);
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
        return Flux.store("status").getState();
    },


    render: function() {
        var time = '',
            nowPlayingTxt = 'Nothing Playing...',
            track = this.state.currentTrack;

        if(track && track.title) {
            var artist = track.artist.length > 0 ? track.artist[0] : 'Unknown Artist';
            nowPlayingTxt = artist + ' - ' + track.album + ' - ' + track.title;
        }

        if(this.state.time) {
            time = this.msToTime(this.getMillisecondsFromTime(this.state.time)) + '/' + this.msToTime(this.getMillisecondsFromTime(this.state.maxTime));
        }

        return <section className="status">{nowPlayingTxt} {time} <Controls isPlaying={this.state.isPlaying} /></section>
    }
});