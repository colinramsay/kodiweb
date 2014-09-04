var constants = require('./constants'),
    Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.albums = [];
        this.loading = false;
        
        this.bindActions(
            constants.PLAY_ALBUM, this.onPlayAlbum,
            constants.GET_ALBUMS, this.onGetAlbums,
            constants.GET_ALBUMS_SUCCESS, this.onGetAlbumsSuccess,
            constants.GET_ALBUMS_FAILURE, this.onGetAlbumsFailure
        );
    },


    getState: function() {
        return {
            currentAlbumId: this.currentAlbumId,
            albums: this.albums
        };
    },


    onPlayAlbum: function(payload) {
        this.currentAlbumId = payload;
        this.emit('change');
    },


    onGetAlbums: function() {
        this.loading = true;
        delete this.errorMessage;
        this.emit('change');
    },


    onGetAlbumsFailure: function(payload) {
        this.loading = false;
        this.errorMessage = payload;
        this.emit('change');
    },


    onGetAlbumsSuccess: function(payload) {
        this.loading = false;
        this.albums = payload.albums;
        this.emit('change');
    }
});