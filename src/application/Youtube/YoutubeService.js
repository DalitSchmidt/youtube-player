app.service('$youtube', ['$log', function( $log ) {
    let player = false
    let videoId = false

    return {
        initPlayer: function() {
            if ( player ) {
                player.loadVideoById( videoId )
                return
            }

            player = new YT.Player('player', {
                videoId: videoId,
                playerVars: {
                    'color': 'white',
                    'autoplay': 1,
                    'controls': 2,
                    'showinfo': 0,
                    'fs': 0,
                    'rel' : 0
                }
            })
        },

        createPlayer: function( id ) {
            let self = this

            videoId = id

            // If the library isn't here at all,
            if ( typeof YT === 'undefined' ) {
                // ...grab on to global callback, in case it's eventually loaded
                $window.onYouTubeIframeAPIReady = self.initPlayer;
                $log('Unable to find YouTube iframe library on this page.')
            } else {
                YT.ready( self.initPlayer )
            }

        }
    }
}])