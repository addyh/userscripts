// ==UserScript==
// @name         Nextcloud Fixes
// @description  Fix Nextcloud Apps.
// @version      1.2.5
// @author       addyh
// @copyright    GPLv3
// @run-at       document-end
// @grant        none
//
// @match        https://*/apps/tasks/*
// @match        https://*/apps/notes/*
// @match        https://*/apps/files/*
// ==/UserScript==

(function() {
    window.addEventListener( 'load', function() {

        // Close side panel on mobile
        function closeNavSidePanel() {
            if ( document.querySelectorAll( '#app-navigation-vue.app-navigation.app-navigation--close' ).length == 0 ) {
                if ( window.innerWidth <= 1024 ) {
                    document.querySelector( '.app-navigation-toggle' ).click();
                }
            }
        }
        // Close side panel when clicking away
        if ( document.querySelector( 'main#app-content-vue' ) ) {
            document.querySelector( 'main#app-content-vue' ).addEventListener( 'click', closeNavSidePanel );
        }
        if ( document.querySelector( 'div#app-content' ) ) {
            document.querySelector( 'div#app-content' ).addEventListener( 'click', closeNavSidePanel );
        }

        // Nextcloud Tasks
        if ( document.querySelector( '.app-tasks' ) ) {

            // Add css to page
            var style = document.createElement('style');
            style.innerHTML = `
                /* Show Task Notes at all times */
                #tab-app-sidebar-tab-details {
                    display: block;
                    width: 100%;
                    min-height: unset;
                    height: unset;
                    overflow: visible;
                }
                #tab-app-sidebar-tab-notes {
                    display: block;
                    min-height: unset;
                    height: unset;
                }
                #tab-app-sidebar-tab-notes > .property__item {
                    min-height: unset;
                    padding: 0;
                }
                #tab-app-sidebar-tab-notes .note__editor > pre {
                    padding-bottom: 25px !important;
                    /* padding-bottom: 50px !important; ---- Larger Text Area */
                }
                #tab-app-sidebar-tab-notes .note__editor > textarea {
                    border: 1px solid var(--color-primary-element);
                    padding: 15px;
                    margin-left: 0;
                }
                #tab-app-sidebar-tab-notes #note__viewer {
                    padding: 15px 15px 35px 15px;
                    /* padding: 15px 15px 60px 15px; ---- Larger Text Area */
                    margin-left: 0;
                }
                .app-tasks .app-sidebar-tabs__nav {
                    display: none;
                }
            `;
            document.head.append(style);

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
            }, 1000 );

            function mutation_loop() {
                // Remove "Delete all completed tasks" button
                var e = document.querySelector( 'div.loadmore.reactive > button > span.button-vue__wrapper > span.button-vue__icon > span.material-design-icon.delete-icon' );
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
            let mutationObserver = new MutationObserver( function() {
                mutation_loop();
            } );
            mutationObserver.observe( document.documentElement, {
                attributes: true,
                characterData: true,
                childList: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true
            } );

            // @TODO Hide/Show all completed tasks button
            // Completed tasks:
            //   .task-item--closed
            // Completed tasks header:
            //   .heading.heading--hiddentasks.reactive

        }

        // Nextcloud Notes & Nextcloud Files
        else if ( document.querySelector( '.app-notes' ) || document.querySelector( '.app-files' ) ) {

            setTimeout( function() {
                // Close side panel after clicking a category
                var categories = document.querySelectorAll( 'ul.app-navigation__list .app-navigation-entry-link' );
                for ( var i = 0; i < categories.length; i++ ) {
                    categories[i].addEventListener( 'click', closeNavSidePanel );
                }
            }, 1000 );

        }

    } );
})();
