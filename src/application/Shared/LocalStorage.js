/**
 * Saving a local copy of the wishlist here in the factory
 * Every changes are being updated here in the factory and saved back to the local storage
 */

app.factory('$localStorageWishList', ['$window', 'LS_CELL_NAME', function( $window, LS_CELL_NAME ) {
    let storage = $window.localStorage
    let wishlist = []

    /**
     * Saves the wishlist back to the local storage
     */
    function save() {
        storage.setItem( LS_CELL_NAME, angular.toJson( wishlist ) )
    }

    /**
     * Finds an item (by code) in the wishlist
     * @param code
     * @returns {*}
     */
    function findInList( code ) {
        // I could use underscore.js or lodash.js but I didn't want to add all the lib
        // only for this dummy search
        for ( let i = 0; i < wishlist.length; i++ ) {
            if ( wishlist[ i ].code === code )
                return true
        }
        
        return false
    }

    return {
        /**
         * Fetches the list from the storage
         * If no list has been found it will create one
         */
        fetchList: function() {
            let list = storage.getItem( LS_CELL_NAME )
            wishlist = ( list === null ) ? [] : angular.fromJson( list )
        },

        getList: function() {
            return wishlist
        },

        /**
         * Adds item to the list
         * @param item
         */
        addItem: function( item ) {
            wishlist.push( item )
            // Use save each time we update something
            save()
        },

        /**
         * Check if item exists on list, return the index
         * false if not
         * @param code
         * @returns {boolean|number}
         */
        hasItem: function( code ) {
            return findInList( code )
        },

        /**
         * Removes items from the list
         * @param item
         */
        removeItem: function( item ) {
            let index = findInList( item )
            wishlist.splice(index, 1)
            // Use save each time we update something
            save()
        }
    }
}])