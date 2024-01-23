// ==UserScript==
// @name         Nextcloud Tasks
// @description  Fix Nextcloud Tasks.
// @version      1.0.0
// @author       addyh
// @copyright    GPLv3
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @grant        none
//
// @match        https://*/apps/tasks/*
// ==/UserScript==

(function() {

    // Close side panel after selecting a Task List on mobile
    window.addEventListener( 'load', function() {
        setTimeout( function() {
            if ( window.innerWidth <= 1024 ) {
                var elements = document.querySelectorAll( '.app-navigation-entry-link' );
                for ( var i = 0; i < elements.length; i++ ) {
                    elements[i].addEventListener( 'click', function() {
                        document.querySelector( '.app-navigation-toggle' ).click();
                    } );
                }
            }
        }, 1000 );
    } );

})();
