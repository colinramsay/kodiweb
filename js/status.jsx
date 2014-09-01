/** @jsx React.DOM */
var Controls = require('./controls'),
    React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            currentTrack: null,
            currentArtist: null,
            currentAlbum: null,
            time: null,
            maxTime: null,
            currentPlaylistPosition: null
        }
    },

    getMillisecondsFromTime: function(time) {
        var ms = time.milliseconds;

        ms = ms + time.seconds * 1000;
        ms = ms + time.minutes * 60000;

        return ms;
    },

    onGetPlayerProperties: function(data) {
        this.setState({
            time: this.getMillisecondsFromTime(data.time),
            maxTime: this.getMillisecondsFromTime(data.totaltime),
            currentPlaylistPosition: data.position
        });
    },

    onGetPlaylistItems: function(data) {
        var track = data.items[this.state.currentPlaylistPosition];

        if(!track) {
            return;
        }

        var artist = track.artist.length > 0 ? track.artist[0] : 'Unknown Artist';

        if(artist.length === 0) {
            artist = 'Unknown Artist';
        }

        this.setState({
            currentTrack: track.title,
            currentAlbum: track.album,
            currentArtist: artist
        });
    },

    msToTime: function(milli){
        var milliseconds = milli % 1000;
        var seconds = Math.floor((milli / 1000) % 60);
        var minutes = Math.floor((milli / (60 * 1000)) % 60);

        return minutes + ":" + seconds;
    },


    componentDidMount: function() {
        var me = this;

        setInterval(function() {
            if(me.state.time) {
                if(me.state.time < me.state.maxTime) {
                    me.setState({
                        time: me.state.time + 1000
                    });
                }
            }
        }, 1000);

        setInterval(function() {
            window.kodi.Player.GetProperties({"playerid":0,"properties":["playlistid","speed","position","totaltime","time"]}, me.onGetPlayerProperties);
        }, 10000);

        setInterval(function() {
            window.kodi.Playlist.GetItems({"playlistid":0,"properties":["title","album","artist","duration"]}, me.onGetPlaylistItems);
        }, 10000);
    },

    render: function() {
        var time = '',
            nowPlaying = 'Nothing Playing...';

        if(this.state.currentTrack) {
            nowPlaying = this.state.currentArtist + ' - ' + this.state.currentAlbum + ' - ' + this.state.currentTrack;
        }

        if(this.state.maxTime) {
            time = this.msToTime(this.state.time) + '/' + this.msToTime(this.state.maxTime);
        }

        return <section className="status">{nowPlaying} {time} <Controls /></section>
    }
});