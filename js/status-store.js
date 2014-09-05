var constants = require('./constants'),
    Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.currentTrack = {};
        this.nowPlaying = {};
        this.isLoading = false;
        this.isMuted = false;
        this.volume = 50;

        this.bindActions(
            constants.VOLUME_CHANGED, this.onVolumeChanged,
            constants.UPDATE_VOLUME, this.onUpdateVolume,
            constants.UPDATE_STATUS, this.onUpdateStatus,
            constants.PAUSE, this.onUpdateStatus,
            constants.PLAY, this.onUpdateStatus,
            constants.START_LOADING, this.onStartLoading,
            constants.END_LOADING, this.onEndLoading
        );
    },


    onVolumeChanged: function(payload) {
        this.volume = payload;
        this.emit('change');
    },

    onUpdateVolume: function(payload) {
        this.volume = payload.volume;
        this.isMuted = payload.muted;
        this.emit('change');
    },
    

    onStartLoading: function(payload) {
        this.isLoading = true;
        this.loadingMsg = payload;
        this.emit('change');
    },


    onEndLoading: function() {
        delete this.loadingMsg;
        this.isLoading = false;
        this.emit('change');
    },


    getState: function() {
        return {
            nowPlaying: this.nowPlaying,
            currentTrack: this.currentTrack,
            isPlaying: this.isPlaying,
            isLoading: this.isLoading,
            loadingMsg: this.loadingMsg
        }
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