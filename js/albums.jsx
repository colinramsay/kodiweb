/** @jsx React.DOM */
var React = require('react'),
    Fluxxor = require("fluxxor"),
    FluxChildMixin = Fluxxor.FluxChildMixin(React);

module.exports = React.createClass({
    mixins: [FluxChildMixin],

    onAlbumClick: function(event) {
        var albumId = event.currentTarget.getAttribute('data-album-id');
        this.getFlux().actions.playAlbum(albumId);
    },


    render: function() {
        var albums = this.props.albums.map(function(album) {
            var img = album.thumbnail ? 'http://pi.local/image/' + encodeURI(album.thumbnail) : 'images/album-placeholder.png';
            var artist = album.artist.length > 0 ? album.artist[0] : 'Unknown Artist';

            if(artist.length === 0) {
                artist = 'Unknown Artist';
            }

            return <li onClick={this.onAlbumClick} data-album-id={album.albumid} key={album.albumid}><img className="lazy" src={img} /><div><p>{artist}</p><p>{album.title}</p></div></li>
        }.bind(this));
        
        return <ul className="albums">{albums}</ul>
    }
});