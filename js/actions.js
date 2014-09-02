var constants = require('./constants');

module.exports = {

    pause: function() {
        this.dispatch(constants.PAUSE, { speed: 0 });
        this.kodi.Player.PlayPause({playerid : 0, play: false})
    },


    play: function() {
        this.dispatch(constants.PLAY, { speed: 1 });
        this.kodi.Player.PlayPause({playerid : 0, play: true })
    },


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
            }.bind(this)
        );
    },


    getPlaylist: function() {
        if(this.kodi.Playlist) {
            this.kodi.Playlist.GetItems(
                {"playlistid":0,"properties":["title","album","artist","duration"]},
                function(payload) {
                    var store = this.flux.store("albumStore");

                    this.dispatch(constants.UPDATE_STATUS, {
                        currentTrack: payload.items[store.nowPlaying.currentPlaylistPosition]
                    });
                }.bind(this)
            );
        }
    },


    getPlayerProperties: function() {
        if(this.kodi.Player) {
            this.kodi.Player.GetProperties({"playerid":0,"properties":["playlistid","speed","position","totaltime","time"]}, this.flux.actions.onGetPlayerProperties.bind(this));
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
}