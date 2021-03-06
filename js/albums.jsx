/** @jsx React.DOM */
var React = require('react'),
    Flux = require('./flux'),
    StoreWatchMixin = require("./store-watch-mixin");

module.exports = React.createClass({
    mixins: [StoreWatchMixin("album")],

    onAlbumClick: function(event) {
        var albumId = event.currentTarget.getAttribute('data-album-id');
        Flux.actions.album.playAlbum(albumId);
    },


    getStateFromFlux: function() {
        var store = Flux.store("album").getState();

        return {
            albums: store.albums,
            currentAlbumId: store.currentAlbumId
        }
    },


    onSearch: function(e) {
        console.log(e.target.value);
        Flux.actions.album.search(e.target.value);
    },


    render: function() {
        var albums = this.state.albums.map(function(album) {
            var img = album.thumbnail ? 'http://pi.local:8080/image/' + encodeURI(album.thumbnail) : 'images/album-placeholder.png';
            var artist = album.artist.length > 0 ? album.artist[0] : 'Unknown Artist';

            if(artist.length === 0) {
                artist = 'Unknown Artist';
            }

            return <li onClick={this.onAlbumClick} className={album.albumid == this.state.currentAlbumId ? 'playing' : ''} data-album-id={album.albumid} key={album.albumid}><img src={img} /><div><p>{artist}</p><p>{album.title}</p></div></li>
        }.bind(this));

        return <div>
            <ul className="albums">{albums}</ul>
            <div className="searchbar">
                <input type="search" placeholder="Search Albums..." autoFocus="true" onInput={this.onSearch} />
            </div>
        </div>
    }
});