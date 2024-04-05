// ==UserScript==
// @name         Nextcloud Fixes
// @description  Fix Nextcloud Apps.
// @version      1.3.8
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

        // Add css to nextcloud pages
        var style = document.createElement('style');
        style.innerHTML = `
            /*
            ========================
                    CALENDAR
            ========================
            */

            /* Hide Event Times */
            .app-calendar .fc-event {
                flex-direction: column;
            }
            .app-calendar .fc-event .fc-daygrid-event-dot {
                margin-bottom: 2px;
                width: 100%;
                border-width: 1px;
            }
            .app-calendar .fc-event .fc-event-time {
                /* display: none; */
                font-size: 12px;
                line-height: 2;
            }
            .app-calendar .fc-event .fc-event-title {
                text-overflow: inherit;
                overflow: visible;
                white-space: normal;
                word-wrap: break-word;
                line-height: 1.4;
                width: 100%;
            }
            @media screen and (max-width: 700px) {
                .app-calendar .fc-event .fc-event-title {
                    font-size: 11px;
                }
            }
            /* Add spacing below All-Day tasks */
            .fc-daygrid-event-harness {
                margin-bottom: 1px;
            }

            /*
            ========================
                    TASKS
            ========================
            */

            /* Re-order Task Title and Buttons in Right Sidebar */
            .app-tasks .app-sidebar-header__desc {
                padding-right: 15px !important;
                padding-top: 65px !important;
                padding-left: 15px !important;
            }
            .app-tasks .app-sidebar-header__tertiary-actions {
                position: absolute;
                top: 10px;
                left: 5px;
            }
            .app-tasks p.app-sidebar-header__subtitle {
                position: absolute;
                top: 20px;
                left: 50px;
                overflow: visible;
                width: calc(100% - 145px) !important;
                white-space: unset !important;
                text-overflow: unset !important;
            }

            /* Show Full Task Title in Right Sidebar */
            .app-tasks h2.app-sidebar-header__maintitle {
                white-space:normal !important;
            }

            /* Show Full Task Title in Right Sidebar in Edit Mode */
            .app-sidebar-header__maintitle-form > button {
                width: 100% !important;
                margin: 5px auto !important;
                padding: 12px;
            }
            .app-sidebar-header__maintitle-form > button > span.button-vue__wrapper {
                display: none;
            }
            .app-sidebar-header__maintitle-form > input.app-sidebar-header__maintitle-input {
                display: none !important;
            }

            /* Show Task Notes at all times in Right Sidebar */
            .app-tasks #tab-app-sidebar-tab-details {
                display: block;
                width: 100%;
                min-height: unset;
                height: unset;
                overflow: visible;
            }
            .app-tasks #tab-app-sidebar-tab-notes {
                display: block;
                min-height: unset;
                height: unset;
            }
            .app-tasks #tab-app-sidebar-tab-notes > .property__item {
                min-height: unset;
                padding: 0;
            }
            .app-tasks #tab-app-sidebar-tab-notes .note__editor > pre {
                padding-bottom: 25px !important;
                /* padding-bottom: 50px !important; ---- Larger Text Area */
            }
            .app-tasks #tab-app-sidebar-tab-notes .note__editor > textarea {
                border: 1px solid var(--color-primary-element);
                padding: 15px;
                margin-left: 0;
            }
            .app-tasks #tab-app-sidebar-tab-notes #note__viewer {
                padding: 15px 15px 35px 15px;
                /* padding: 15px 15px 60px 15px; ---- Larger Text Area */
                margin-left: 0;
            }
            .app-tasks #tab-app-sidebar-tab-notes #note__viewer p {
                margin-bottom: 20px;
            }
            .app-tasks .app-sidebar-tabs__nav {
                display: none;
            }

            /*
            ========================
              ALL - Header Navbar
            ========================
            */

            #notifications .header-menu__content {
                max-width: calc(100vw - 32px) ;
            }

            /* Fix Unified Search Position */
            #unified-search {
                padding: 0;
                height: 100%;
            }

            /* Remove Unified Search Header */
            #unified-search .modal-header {
                display: none !important;
            }

            /* Header Navbar - Make Extended Menu Dots White */
            nav.app-menu .app-menu-more.action-item > .v-popper > button.action-item__menutoggle {
                color: white;
            }

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

        // Nextcloud Tasks
        if ( document.querySelector( '.app-tasks' ) ) {

            var mutation_once_done = false;

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

            function mutation_once() {
                // Show Full Task Title in Right Sidebar in Edit Mode
                if ( $("h2.app-sidebar-header__maintitle").length ) {
                    $("h2.app-sidebar-header__maintitle").on("click", function () {
                        setTimeout(function() {
                            $(".app-sidebar-header__maintitle-form").css("display", "block");
                            $(".app-sidebar-header__maintitle-form > input.app-sidebar-header__maintitle-input").each(function () {
                                var $txtarea = $("<textarea />");
                                var $input = $(this);
                                var $button = $input.parent().children("button");
                                $txtarea.attr("class", "app-sidebar-header__maintitle-input");
                                $txtarea.attr("rows", 8);
                                $txtarea.attr("cols", 60);
                                $txtarea.css("width", "100%");
                                $txtarea.css("font-size", "20px");
                                $txtarea.css("font-weight", "bold");
                                $txtarea.css("line-height", "30px");
                                $txtarea.css("padding", "0 5px");
                                $txtarea.val(this.value);
                                $input.parent().prepend($txtarea);
                                $button.css("margin", "0 auto");
                                $button.attr("class", "button");
                                $button.prepend('<span>Save</span>');
                                $input.css("display", "none");
                                $txtarea.focus();
                                $txtarea.on("input", function(e) {
                                    $input.val(this.value);
                                    $input[0].dispatchEvent(new Event("input", { bubbles: true }));
                                });
                                $txtarea.on("keyup", function(e) {
                                    if ( e.code == "NumpadEnter" || e.code == "Enter" ) {
                                        $("body").click();
                                    }
                                });
                            });
                        }, 1);
                    });
                    mutation_once_done = true;
                }
            }
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
                if ( ! mutation_once_done ) {
                    mutation_once();
                }
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
