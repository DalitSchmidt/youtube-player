app.run(['$localStorageWishList', function( $localStorageWishList ) {
    $localStorageWishList.fetchList()
}])

app.constant('LS_CELL_NAME', 'youtube-wishlist')