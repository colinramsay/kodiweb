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
            constants.MUTED, this.onMuted,
            constants.MUTE_ERROR, this.onMuteError,
            constants.VOLUME_CHANGED, this.onVolumeChanged,
            constants.UPDATE_VOLUME, this.onUpdateVolume,
            constants.UPDATE_STATUS, this.onUpdateStatus,
            constants.UPDATE_CURRENT_TRACK, this.onUpdateCurrentTrack,
            constants.PAUSE, this.onUpdateStatus,
            constants.PLAY, this.onUpdateStatus,
            constants.START_LOADING, this.onStartLoading,
            constants.END_LOADING, this.onEndLoading
        );
    },

    onMuted: function(mute) {
        this.isMuted = mute;
        this.emit('change');
    },


    onMuteError: function(mute) {
        this.isMuted = mute;
        this.emit('change');
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


    onUpdateCurrentTrack: function(currentTrack) {
        this.currentTrack = currentTrack;
    },


    onUpdateStatus: function(payload) {

        this.time = payload.time;
        this.maxTime = payload.totaltime;
        this.currentPlaylistPosition = payload.position;
        this.speed = payload.speed;

        if(payload.speed) {
            this.isPlaying = payload.speed > 0;
        } else {
            this.isPlaying = false;
        }

        this.emit('change');
    }
});