var constants = require('./constants');

module.exports = {

    getAppProperties: function() {
        if(this.kodi.Application) {
            this.kodi.Application.GetProperties({properties: ['volume', 'muted']}, function(payload) {
                this.dispatch(constants.UPDATE_VOLUME, payload);
            }.bind(this));
        }
    },

    getPlaylist: function() {
        if(this.kodi.Playlist) {
            this.kodi.Playlist.GetItems(
                {"playlistid":0,"properties":["title","album","artist","duration"]},
                function(payload) {
                    var store = this.flux.store("status");

                    if(payload.items) {
                        this.dispatch(constants.UPDATE_STATUS, {
                            currentTrack: payload.items[store.nowPlaying.currentPlaylistPosition]
                        });
                    }
                }.bind(this)
            );
        }
    },


    getPlayerProperties: function() {
        if(this.kodi.Player) {
            this.kodi.Player.GetProperties({"playerid":0,"properties":["playlistid","speed","position","totaltime","time"]}, this.flux.actions.status.onGetPlayerProperties.bind(this));
        }
    },
    

    onGetPlayerProperties: function(data) {
        this.dispatch(constants.UPDATE_STATUS, { nowPlaying: {
            time: data.time,
            maxTime: data.totaltime,
            currentPlaylistPosition: data.position,
            speed: data.speed
        }});
    } 
};