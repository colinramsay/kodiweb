var constants = require('./constants');

module.exports = {

    playAlbum: function(albumId) {

        this.dispatch(constants.PLAY_ALBUM, albumId);
        
        albumId = parseInt(albumId);

        var afterAdd = function() {
            this.kodi.Player.Open({ item: { playlistid: 0, position: 0 }});
        }.bind(this);

        var afterClear = function() {
            this.kodi.Playlist.Add({ playlistid: 0, item: { albumid: albumId }}, afterAdd);
        }.bind(this);

        this.kodi.Playlist.Clear({ playlistid: 0 }, afterClear);
    },


    getAlbums: function() {
        this.dispatch(constants.GET_ALBUMS);

        this.kodi.AudioLibrary.GetAlbums({
                "limits":{"start":0},
                "properties":["artist","title","thumbnail"],
                "sort":{"method":"artist"}
        }, function(payload) {
            this.dispatch(constants.GET_ALBUMS_SUCCESS, payload);
        }.bind(this),
            function(payload) {
                this.dispatch(constants.GET_ALBUMS_FAILURE, payload);
            }.bind(this)
        );
    }
}