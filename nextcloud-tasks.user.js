// ==UserScript==
// @name         Nextcloud Tasks
// @description  Fix Nextcloud Tasks.
// @version      1.1.2
// @author       addyh
// @copyright    GPLv3
// @run-at       document-end
// @grant        none
//
// @match        https://*/apps/tasks/*
// ==/UserScript==

(function() {

    // Close side panel on mobile
    function closeNavSidePanel() {
        if ( document.querySelectorAll('#app-navigation-vue.app-navigation.app-navigation--close').length == 0 ) {
            if ( window.innerWidth <= 1024 ) {
                document.querySelector( '.app-navigation-toggle' ).click();
            }
         }
    }
    window.addEventListener( 'load', function() {
        setTimeout( function() {
            // Close side panel after clicking a task list
            var task_lists = document.querySelectorAll( 'li[calendar-id] .app-navigation-entry-link' );
            for ( var i = 0; i < task_lists.length; i++ ) {
                task_lists[i].addEventListener( 'click', closeNavSidePanel );
            }
            // Close side panel after clicking a collection of task lists ("All", "Current", "Completed", etc)
            var collections = document.querySelectorAll( 'li[collection-id] .app-navigation-entry-link' );
            for ( var i = 0; i < collections.length; i++ ) {
                collections[i].addEventListener( 'click', closeNavSidePanel );
            }
            // Close side panel when clicking away
            document.querySelector( 'main#app-content-vue' ).addEventListener( 'click', closeNavSidePanel );
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
    //   .heading.heading--hiddentasks.reactive

})();
