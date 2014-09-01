/** @jsx React.DOM */
var Controls = require('./controls'),
    React = require('react'),
    Fluxxor = require("fluxxor"),
    FluxChildMixin = Fluxxor.FluxChildMixin(React);

module.exports = React.createClass({
    mixins: [FluxChildMixin],

    componentDidMount: function() {
        setInterval(this.getFlux().actions.getPlaylist, 5000);
        //setInterval(this.getFlux().actions.updateTime, 1000);
        setInterval(this.getFlux().actions.getPlayerProperties, 1000);
    },


    getMillisecondsFromTime: function(time) {
        var ms = time.milliseconds;

        ms = ms + time.seconds * 1000;
        ms = ms + time.minutes * 60000;

        return ms;
    },


    render: function() {
        var time = '',
            nowPlayingTxt = 'Nothing Playing...',
            track = this.props.currentTrack,
            nowPlaying = this.props.nowPlaying;

        if(track && track.track) {
            nowPlayingTxt = track.artist + ' - ' + track.album + ' - ' + track.track;
        }

        if(nowPlaying && nowPlaying.maxTime) {
            time = this.getMillisecondsFromTime(nowPlaying.time) + '/' + this.getMillisecondsFromTime(nowPlaying.maxTime);
        }

        return <section className="status">{nowPlayingTxt} {time} <Controls /></section>
    }
});