var constants = require('./constants');

module.exports = {
    initialize: function() {
        this.kodi = new Xbmc.Controller({
            host:'pi.local',
            port: 80,
            onInit: function() {
                this.flux.actions.album.getAlbums();
            }.bind(this)
        });
    },


    pause: function() {
        this.dispatch(constants.PAUSE, { speed: 0 });
        this.kodi.Player.PlayPause({playerid : 0, play: false})
    },


    play: function() {
        this.dispatch(constants.PLAY, { speed: 1 });
        this.kodi.Player.PlayPause({playerid : 0, play: true })
    }
};