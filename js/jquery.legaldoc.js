/*
    jquery.legaldoc.js

*/

(function ( $ ) {
 
    $.fn.legaldoc = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
        }, options );
 
        return this;

        // return this.each(function() {
        //     // Do something to each element here.
        // });
 
    };
 
}( jQuery ));