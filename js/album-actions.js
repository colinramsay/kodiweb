var constants = require('./constants');

module.exports = {

    search: function(terms) {
        this.dispatch(constants.SEARCH_ALBUMS, terms);
    },

    playAlbum: function(albumId) {

        this.dispatch(constants.PLAY_ALBUM, albumId);
        this.dispatch(constants.START_LOADING, 'Loading album...');

        albumId = parseInt(albumId);

        var afterAdd = function() {
            this.kodi.Player.Open({ item: { playlistid: 0, position: 0 }}, function() {
                this.dispatch(constants.END_LOADING);
            }.bind(this));
        }.bind(this);

        var afterClear = function() {
            this.kodi.Playlist.Add({ playlistid: 0, item: { albumid: albumId }}, afterAdd);
        }.bind(this);

        this.kodi.Playlist.Clear({ playlistid: 0 }, afterClear);
    },


    getAlbums: function() {
        this.dispatch(constants.GET_ALBUMS);
        this.dispatch(constants.START_LOADING, 'Fetching albums...');

        this.kodi.AudioLibrary.GetAlbums({
                "limits":{"start":0},
                "properties":["artist","title","thumbnail"],
                "sort":{"method":"artist"}
        }, function(payload) {
            this.dispatch(constants.GET_ALBUMS_SUCCESS, payload);
            this.dispatch(constants.END_LOADING);
        }.bind(this),
            function(payload) {
                this.dispatch(constants.GET_ALBUMS_FAILURE, payload);
                this.dispatch(constants.END_LOADING);
            }.bind(this)
        );
    }
}