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
    function closeNavSidePanel() {
        document.querySelector( '.app-navigation-toggle' ).click();
    }
    window.addEventListener( 'load', function() {
        setTimeout( function() {
            if ( window.innerWidth <= 1024 ) {
                // Apply to all Task lists
                var task_lists = document.querySelectorAll( 'li[calendar-id] .app-navigation-entry-link' );
                for ( var i = 0; i < task_lists.length; i++ ) {
                    task_lists[i].addEventListener( 'click', closeNavSidePanel);
                }
                // Apply to all Collections of lists
                var collections = document.querySelectorAll( 'li[collection-id] .app-navigation-entry-link' );
                for ( var i = 0; i < collections.length; i++ ) {
                    collections[i].addEventListener( 'click', closeNavSidePanel);
                }
            }
        }, 1000 );
    } );

    // Remove "Delete all completed tasks" button
    function mutation_loop() {
        var e = document.querySelector('div.loadmore.reactive > button > span.button-vue__wrapper > span.button-vue__icon > span.material-design-icon.delete-icon');
        if (
            e &&
            e.parentElement &&
            e.parentElement.parentElement &&
            e.parentElement.parentElement.parentElement &&
            e.parentElement.parentElement.parentElement.parentElement
        ) {
            e.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    }
    window.addEventListener( 'load', function() {
        let mutationObserver = new MutationObserver(function() {
            mutation_loop();
        });
        mutationObserver.observe( document.documentElement, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        } );
    } );

    // @TODO Hide/Show all completed tasks button
    // Completed tasks:
    //   .task-item--closed
    // Completed tasks header:
    //   heading.heading--hiddentasks.reactive

})();
