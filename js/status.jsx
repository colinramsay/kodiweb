/** @jsx React.DOM */
var Status = React.createClass({

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

    onGetPlayerProperties: function(data) {
        this.setState({
            time: data.time.minutes + ':' + data.time.seconds,
            maxTime: data.totaltime.minutes + ':' + data.totaltime.seconds,
            currentPlaylistPosition: data.position
        });
    },

    onGetPlaylistItems: function(data) {
        var track = data.items[this.state.currentPlaylistPosition];

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

    componentDidMount: function() {
        var me = this;

        setInterval(function() {
            window.kodi.Player.GetProperties({"playerid":0,"properties":["playlistid","speed","position","totaltime","time"]}, me.onGetPlayerProperties);
        }, 3000);

        setInterval(function() {
            window.kodi.Playlist.GetItems({"playlistid":0,"properties":["title","album","artist","duration"]}, me.onGetPlaylistItems);
        }, 1000);
    },

    render: function() {
        var time = '';

        if(this.state.maxTime) {
            time = this.state.time + '/' + this.state.maxTime;
        }

        return <section className="status">
            {this.state.currentArtist} - {this.state.currentAlbum} - {this.state.currentTrack} {time}
        </section>
    }
});