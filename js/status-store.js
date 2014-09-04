var constants = require('./constants'),
    Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.currentTrack = {};
        this.nowPlaying = {};

        this.bindActions(
            constants.UPDATE_STATUS, this.onUpdateStatus,
            constants.PAUSE, this.onUpdateStatus,
            constants.PLAY, this.onUpdateStatus
        );
    },
    

    getState: function() {
        return {
            nowPlaying: this.nowPlaying,
            currentTrack: this.currentTrack,
            isPlaying: this.isPlaying
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