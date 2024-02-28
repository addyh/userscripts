// ==UserScript==
// @name         Nextcloud Fixes
// @description  Fix Nextcloud Apps.
// @version      1.3.3
// @author       addyh
// @copyright    GPLv3
// @run-at       document-end
// @grant        none
//
// @match        https://*/apps/tasks/*
// @match        https://*/apps/notes/*
// @match        https://*/apps/files/*
// @match        https://*/apps/calendar/*
// @match        https://*/apps/contacts/*
// @match        https://*/apps/dashboard/*
// ==/UserScript==

(function() {
    window.addEventListener( 'load', function() {

        // Close left side panel on mobile
        function closeNavSidePanel() {
            if ( document.querySelectorAll( '#app-navigation-vue.app-navigation.app-navigation--close' ).length == 0 ) {
                if ( window.innerWidth <= 1024 ) {
                    document.querySelector( '.app-navigation-toggle' ).click();
                }
            }
        }

        // Close left side panel when clicking away
        if ( document.querySelector( 'main#app-content-vue' ) ) {
            document.querySelector( 'main#app-content-vue' ).addEventListener( 'click', closeNavSidePanel );
        }
        if ( document.querySelector( 'div#app-content' ) ) {
            document.querySelector( 'div#app-content' ).addEventListener( 'click', closeNavSidePanel );
        }
        if ( document.querySelector( 'header#header' ) ) {
            document.querySelector( 'header#header' ).addEventListener( 'click', closeNavSidePanel );
        }

        // Add css to all pages
        var style = document.createElement('style');
        style.innerHTML = `
            /* Header Navbar - Remove Current Page Icon Underline */
            nav.app-menu ul.app-menu-main li.app-menu-entry.app-menu-entry__active::before {
                display: none;
            }

            /* Header Navbar - Remove Search Contacts Icon */
            .header-right #contactsmenu.header-menu.contactsmenu {
                display: none;
            }

            /* Heaer Navbar - Remove Dashboard Icon */
            nav.app-menu ul.app-menu-main li.app-menu-entry[data-app-id="dashboard"] {
                display: none;
            }

            /* Header Navbar - Always Show Icon Labels Text */
            nav.app-menu ul.app-menu-main {
                margin-top: 0;
            }
            nav.app-menu ul.app-menu-main li.app-menu-entry {
                width: 60px;
                display: block;
            }
            nav.app-menu ul.app-menu-main li.app-menu-entry a {
                white-space: normal;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            nav.app-menu ul.app-menu-main li.app-menu-entry img {
                margin-top: 5px !important;
                padding: 0;
            }
            nav.app-menu ul.app-menu-main li.app-menu-entry .app-menu-entry--label {
                position: unset;
                left: unset;
                top: unset;
                transform: none;
                line-height: 1;
                text-overflow: inherit !important;
                overflow: visible !important;
                opacity: 1 !important;
            }
        `;
        document.head.append(style);

        // Nextcloud Calendar
        if ( document.querySelector( '.app-calendar' ) ) {

            // Add css to calendar page
            var style = document.createElement('style');
            style.innerHTML = `
                /* Hide Event Times */
                .fc-event {
                    flex-direction: column;
                }
                .fc-event .fc-daygrid-event-dot {
                    margin-bottom: 2px;
                    width: 100%;
                    border-width: 1px;
                }
                .fc-event .fc-event-time {
                    /* display: none; */
                    font-size: 12px;
                    line-height: 2;
                }
                .fc-event .fc-event-title {
                    text-overflow: inherit;
                    overflow: visible;
                    white-space: normal;
                    word-wrap: break-word;
                    line-height: 1.4;
                    width: 100%;
                    font-size: 11px;
                }
            `;
            document.head.append(style);
        }

        // Nextcloud Tasks
        else if ( document.querySelector( '.app-tasks' ) ) {

            // Add css to tasks page
            var style = document.createElement('style');
            style.innerHTML = `
                /* Re-order Task Title and Buttons in Right Sidebar */
                .app-sidebar-header__desc {
                    padding-right: 15px !important;
                    padding-top: 65px !important;
                    padding-left: 15px !important;
                }
                .app-sidebar-header__tertiary-actions {
                    position: absolute;
                    top: 10px;
                    left: 5px;
                }
                p.app-sidebar-header__subtitle {
                    position: absolute;
                    top: 20px;
                    left: 50px;
                    overflow: visible;
                    width: calc(100% - 145px) !important;
                    white-space: unset !important;
                    text-overflow: unset !important;
                }

                /* Show Full Task Title in Right Sidebar */
                h2.app-sidebar-header__maintitle {
                    white-space:normal !important;
                }

                /* Show Task Notes at all times in Right Sidebar */
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
                #tab-app-sidebar-tab-notes #note__viewer p {
                    margin-bottom: 20px;
                }
                .app-tasks .app-sidebar-tabs__nav {
                    display: none;
                }
            `;
            document.head.append(style);

            setTimeout( function() {
                // Close left side panel after clicking a task list
                var task_lists = document.querySelectorAll( 'li[calendar-id] .app-navigation-entry-link' );
                for ( var i = 0; i < task_lists.length; i++ ) {
                    task_lists[i].addEventListener( 'click', closeNavSidePanel );
                }
                // Close left side panel after clicking a collection of task lists ("All", "Current", "Completed", etc)
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
                // Close left side panel after clicking a category
                var categories = document.querySelectorAll( 'ul.app-navigation__list .app-navigation-entry-link' );
                for ( var i = 0; i < categories.length; i++ ) {
                    categories[i].addEventListener( 'click', closeNavSidePanel );
                }
            }, 1000 );

        }

    } );
})();
