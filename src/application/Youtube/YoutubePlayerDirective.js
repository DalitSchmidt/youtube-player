app.directive('player', ['$youtube',  function ( $youtube ) {
    return {
        restrict: 'A',
        scope: {
            videoId: '@'
        },
        link: function( scope ) {
            scope.$watch('videoId', function( videoId ) {
                if ( videoId )
                    $youtube.createPlayer( videoId )
            })
        }
    }
}])