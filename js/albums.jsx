/** @jsx React.DOM */
var React = require('react'),
    Fluxxor = require("fluxxor"),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
    mixins: [FluxChildMixin, StoreWatchMixin("album")],

    onAlbumClick: function(event) {
        var albumId = event.currentTarget.getAttribute('data-album-id');
        this.getFlux().actions.album.playAlbum(albumId);
    },


    getStateFromFlux: function() {
        var store = this.getFlux().store("album").getState();

        return {
            albums: store.albums,
            currentAlbumId: store.currentAlbumId
        }
    },


    render: function() {
        var albums = this.state.albums.map(function(album) {
            var img = album.thumbnail ? 'http://pi.local/image/' + encodeURI(album.thumbnail) : 'images/album-placeholder.png';
            var artist = album.artist.length > 0 ? album.artist[0] : 'Unknown Artist';

            if(artist.length === 0) {
                artist = 'Unknown Artist';
            }

            return <li onClick={this.onAlbumClick} className={album.albumid == this.state.currentAlbumId ? 'playing' : ''} data-album-id={album.albumid} key={album.albumid}><img className="lazy" src={img} /><div><p>{artist}</p><p>{album.title}</p></div></li>
        }.bind(this));
        
        return <p>alb<ul className="albums">{albums}</ul></p>
    }
});