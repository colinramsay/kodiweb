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
            }.bind(this)
        );
    },


    updateTime: function() {
        var store = this.flux.store("albumStore"),
            isPlaying = store.currentTrack.track,
            time = store.nowPlaying.time;

        // if(isPlaying) {
        //     this.dispatch(constants.UPDATE_STATUS, {
        //         currentTime: time + 1000
        //     });
        // }
    },


    getPlaylist: function() {
        if(this.kodi.Playlist) {
        this.kodi.Playlist.GetItems(
            {"playlistid":0,"properties":["title","album","artist","duration"]},
            function(payload) {
                if(!payload || !payload.items) {
                    return;
                }
                var store = this.flux.store("albumStore"),
                    track = payload.items[store.nowPlaying.currentPlaylistPosition];

                if(!track) {
                    return;
                }

                var artist = track.artist.length > 0 ? track.artist[0] : 'Unknown Artist';

                if(artist.length === 0) {
                    artist = 'Unknown Artist';
                }

                this.dispatch(constants.UPDATE_STATUS, {currentTrack:{
                    track: track.title,
                    album: track.album,
                    artist: artist
                }});
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
            currentPlaylistPosition: data.position
        }});
    } 
}