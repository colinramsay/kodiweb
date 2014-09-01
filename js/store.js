var constants = require('./constants'),
    Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.albums = [];
        this.loading = false;
        this.currentTrack = {};
        this.nowPlaying = {};

        this.bindActions(
            constants.UPDATE_STATUS, this.onUpdateStatus,
            constants.PAUSE, this.onUpdateStatus,
            constants.PLAY, this.onUpdateStatus,
            constants.GET_ALBUMS, this.onGetAlbums,
            constants.GET_ALBUMS_SUCCESS, this.onGetAlbumsSuccess,
            constants.GET_ALBUMS_FAILURE, this.onGetAlbumsFailure
        );
    },


    getState: function() {
        return {
            isPlaying: this.isPlaying,
            currentTrack: this.currentTrack,
            nowPlaying: this.nowPlaying,
            loading: this.loading,
            albums: this.albums
        };
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
    },


    onUpdateStatus: function(payload) {
        jQuery.extend(this, payload);

        if(payload.nowPlaying) {
            if($.isNumeric(payload.nowPlaying.speed)) {
                this.isPlaying = payload.nowPlaying.speed > 0;
            } else {
                this.isPlaying = false;
            }
        }
        this.emit('change');
    }
});