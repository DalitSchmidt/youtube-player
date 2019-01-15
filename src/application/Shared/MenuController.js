/**
 * This controller has very small responsibility
 * When changing the tabs it changes the list name and add watcher to it
 */

app.controller('MenuController', ['$scope', '$localStorageWishList', ( $scope, $localStorageWishList ) => {
    $scope.setList = ( list ) => ($scope.results.list = list)

    /**
     * So when the list changes we put in the results the items from the wishlist
     */
    $scope.$watch('results.list', function( newVal, oldVal ) {
        if ( newVal === 'remote' ) {
            $scope.results.results = $scope.results.remoteVideos
        } else {
            $scope.results.results = $scope.results.wishlist = $localStorageWishList.getList()
        }
    })
}])