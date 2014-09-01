/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            albums: []
        }
    },

    componentDidUpdate: function() {
        jQuery("img.lazy").lazy({
            bind: 'event'
        });
    },

    componentDidMount: function() {     

        var callback = function(result) {
            if (this.isMounted()) {
                this.setState({
                    albums: result.albums
                });
            }
            // move this
            $('.loading').hide();
        }.bind(this);

        this.props.kodi.AudioLibrary.GetAlbums({
                "limits":{"start":0},
                "properties":["artist","title","thumbnail"],
                "sort":{"method":"artist"}
        }, callback);
    },

    render: function() {
        var albums = this.state.albums.map(function(album) {
            var img = album.thumbnail ? 'http://pi.local/image/' + encodeURI(album.thumbnail) : 'images/album-placeholder.png';
            var artist = album.artist.length > 0 ? album.artist[0] : 'Unknown Artist';

            if(artist.length === 0) {
                artist = 'Unknown Artist';
            }

            return <li key={album.albumid}><img className="lazy" data-src={img} src="" /><div><p>{artist}</p><p>{album.title}</p></div></li>
        });
        
        return <ul className="albums">{albums}</ul>
    }
});