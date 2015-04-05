var constants = require('./constants'),
    Fluxxor = require('fluxxor'),
    _ = require('lodash');

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.albums = [];

        this.bindActions(
            constants.PLAY_ALBUM, this.onPlayAlbum,
            constants.GET_ALBUMS, this.onGetAlbums,
            constants.GET_ALBUMS_SUCCESS, this.onGetAlbumsSuccess,
            constants.GET_ALBUMS_FAILURE, this.onGetAlbumsFailure,
            constants.SEARCH_ALBUMS, this.onSearchAlbums
        );
    },


    getState: function() {
        return {
            currentAlbumId: this.currentAlbumId,
            albums: this.albums
        };
    },


    onSearchAlbums: function(term) {
        if(term.length === 0) {
            console.log('Resetting albums.');
            this.albums = this.unfilteredAlbums || [];
            this.emit('change');
            return;
        }

        var regex = new RegExp(term, 'i');

        console.log('Filtering albums by %s.', term);

        this.albums = _.filter(this.unfilteredAlbums, function(album) {
            return regex.test(album.title) || album.artist[0] ? regex.test(album.artist[0]) : false;
        });

        console.log('Albums now: ', this.albums);

        this.emit('change');
    },

    onPlayAlbum: function(payload) {
        this.currentAlbumId = payload;
        this.emit('change');
    },


    onGetAlbums: function() {
        delete this.errorMessage;
        this.emit('change');
    },


    onGetAlbumsFailure: function(payload) {
        this.errorMessage = payload;
        this.emit('change');
    },


    onGetAlbumsSuccess: function(payload) {
        this.albums = payload.albums;
        this.unfilteredAlbums = payload.albums;
        this.emit('change');
    }
});