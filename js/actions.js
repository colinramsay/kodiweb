var constants = require('./constants');

module.exports = {

    initialize: function() {
        this.kodi = new Xbmc.Controller({
            host:'pi.local',
            port: 80,
            onInit: function() {
                this.flux.actions.getAlbums();
            }.bind(this)
        });
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
            }
        );
    }
}