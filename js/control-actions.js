var constants = require('./constants');

module.exports = {
    initialize: function() {
        this.dispatch(constants.START_LOADING, 'Initializing');
        this.kodi = new Xbmc.Controller({
            host:'pi.local',
            port: 80,
            onInit: function() {
                this.dispatch(constants.END_LOADING);
                this.flux.actions.album.getAlbums();
            }.bind(this)
        });
    },

    setMute: function(mute) {
        this.kodi.setMute(mute);
    },

    setVolume: function(vol) {
        this.kodi.Application.SetVolume({volume: parseInt(vol)}, function(payload) {
            this.dispatch(constants.VOLUME_CHANGED, payload);
        }.bind(this));
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