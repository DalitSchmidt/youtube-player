/**
 * Directive for playing the sounds
 */

app.directive('result', [function() {
    return {
        restrict: 'C',
        link: function( scope, element ) {
            element.on('mouseenter', function( e ) {
                let audio = document.getElementsByTagName("audio")[0]
                audio.play()
            })
        }
    }
}])