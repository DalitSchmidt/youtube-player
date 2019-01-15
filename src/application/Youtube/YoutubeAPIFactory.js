app.factory('YoutubeAPI', ['$http', '$q', function( $http, $q ) {
    let nextPageToken = ''
    let currentQuery = ''
    let videos = []

    /**
     * Reset the current query and the next page token
     * @param term
     */
    function setQuery ( term ) {
        nextPageToken = ''
        currentQuery =  term
        videos = []
    }

    function arrangeVideos( results ) {
        // If nothing is found
        if ( !results.data.items.length )
            return false

        results.data.items.forEach((video, index) => {
            videos.push({
                code: video.id.videoId,
                title: video.snippet.title,
                description: video.snippet.description
            })
        })

        return videos
    }

    return {
        /**
         * Search for youtube video
         * @param term
         * @returns {Promise}
         */
        searchVideos: function( term ) {
            /*
             * If the term parameter is different from the current query,
             * reset the current query and next page token
             */
            if ( currentQuery !== term )
                setQuery( term )

            let deferred = $q.defer()
            $http.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: 'AIzaSyAaVxe2e6AbU3FD2pKTQh1_AySRHC1NY8I',
                    type: 'video',
                    maxResults: '10',
                    pageToken: nextPageToken,
                    part: 'id,snippet',
                    fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
                    q: currentQuery,
                }
            }).then(response => {
                let results = arrangeVideos( response )

                if ( results !== false ) {
                    nextPageToken = response.data.nextPageToken
                    deferred.resolve( results )
                } else
                    deferred.reject( false )
            })

            return deferred.promise
        }
    }
}])