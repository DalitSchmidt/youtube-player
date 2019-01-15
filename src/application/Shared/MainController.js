app.controller('MainController', ['$scope', 'YoutubeAPI', '$youtube', '$localStorageWishList', ( $scope, YoutubeAPI, $youtube, $localStorageWishList ) => {
    // .ready is holding the DOM ready event and .loading is when user searches something
    $scope.ready = $scope.loading = false

    /*
     * I've created 3 vars:
     * When user searches something it will put the results inside remoteVideos and results
     * When user click on "Wishlist" tab it will change the .result property to be the wishlist items
     * That's why the wishlist is saved EXACTLY like the way we repeat the videos in the controller
     */
    $scope.results = {
        remoteVideos: [],
        wishlist: [],
        results: [],
        list: 'remote'
    }
	
    $scope.currentVideo = null

    $scope.setVideo = function( video ) {
        $scope.currentVideo = video
    }

    $scope.searchVideos = function() {
        $scope.loading = true

        YoutubeAPI.searchVideos( $scope.searchTerm ).then( results => {
            $scope.results.remoteVideos = $scope.results.results = results
        }, () => {
            $scope.results.remoteVideos = $scope.results.results = false
        }).finally(() => {
            $scope.loading = false
        })
    }

    /**
     * Watch the search term changes (search bar)
     * If it's empty reset the results, else go and search the videos
     */
    $scope.$watch('searchTerm', function( newVal, oldVal ) {
        if ( typeof newVal === 'undefined' )
            return

        if ( !newVal ) {
            $scope.results.remoteVideos = $scope.results.results = []
            return
        }

        $scope.searchVideos()
    })

    // To check if item is saved in the wishlist
    $scope.isSaved = function( item ) {
        return $localStorageWishList.hasItem( item )
    }

    // Wait till document is ready to remove loader
    angular.element( document ).ready(() => $scope.ready = true)
    $scope.$watch('ready', ( newValue, oldValue ) => angular.element( document.getElementById('main') ).removeClass('loading'))
}])