/**
 * This directive is for the 'heart' icon, to add item to the wishlist
 */

app.directive('wishlist', ['$localStorageWishList', ( $localStorageWishList ) => {
    return {
        restrict: 'C',
        link: function( scope, element, attrs ) {
            element.on('click', e => {
                let video = angular.fromJson( attrs.item )

                if ( $localStorageWishList.hasItem( video.code ) ) {
                    $localStorageWishList.removeItem( video )
                    if ( scope.results.list == 'wishlist' ) {
                        $( element.closest('.result') ).fadeOut('fast')
                    } else {
                        element.removeClass('fa-heart').addClass('fa-heart-o')
                    }
                } else {
                    $localStorageWishList.addItem( video )
                    element.removeClass('fa-heart-o').addClass('fa-heart')
                }
            })
        }
    }
}])