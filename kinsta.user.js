// ==UserScript==
// @name         Kinsta
// @description  MyKinsta Fixes
// @version      2024.5.15.152056
// @author       addyh
// @copyright    GPLv3
// @updateURL    https://github.com/addyh/userscripts/raw/master/kinsta.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/kinsta.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-end
// @grant        none
//
// @match        https://my.kinsta.com/*
// @match        https://my.kinsta.com/sites/*
// ==/UserScript==

(function() {

    window.addEventListener( 'load', function() {

        // OLD Current Site Dropdown - Not used anymore
        /*
        function mutation_loop() {
            // Change Current Site Dropdown Element Background Color to Tell it Apart
            var current_site_id;
            var dropdown_elements = document.querySelectorAll("#\\:r2\\: div[name]");
            if ( dropdown_elements ) {
                for ( var current_site_dropdown_element of dropdown_elements ) {
                    if ( window.location.pathname.includes( current_site_dropdown_element.id ) ) {
                        current_site_id = current_site_dropdown_element.id;
                    }
                }
                var style = document.getElementById('userscript-kinsta-fix-dropdown-background');
                if ( !style ) {
                    style = document.createElement('style');
                    style.id = "userscript-kinsta-fix-dropdown-background";
                    document.head.append(style);
                }
                if ( current_site_id ) {
                    // Fix Site Selector Dropdown - active item background colors
                    style.innerHTML = `
                        div[id="`+current_site_id+`"] {
                            background-color: #333;
                            border: 3px solid #333;
                        }
                        div[id="`+current_site_id+`"]:hover {
                            background-color: #000;
                        }
                    `;
                }
            }
        }
        if ( document.getElementById(':r2:') ) {
            let mutationObserver = new MutationObserver( function() {
                mutation_loop();
            } );
            mutationObserver.observe( document.getElementById(':r2:'), {
                attributes: true,
                characterData: true,
                childList: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true
            } );
        }
        */

        function mutation(e) {

            // Insert Custom CSS
            var current_site_text = 'asdfasdfasdfasdfasdf';
            var current_site_btn = document.querySelector('body header > div a[type="internal"][tabindex="0"][href*="/sites?"] + span + div');
            if ( current_site_btn ) {
                current_site_text = current_site_btn.innerText.replace(/\n/g, ' ');
            }
            var style = document.getElementById('userscript-kinsta-custom-css');
            if ( !style ) {
                style = document.createElement('style');
                style.id = "userscript-kinsta-custom-css";
                document.head.append(style);
            }
            style.innerHTML = `
                /* New Site Selector Popup to Full Height */
                body #root > [position="top"] {
                    top: 0 !important;
                }
                body #root > [position="top"],
                body [cmdk-root].omnisearch,
                body [cmdk-list] {
                    max-height: 100% !important;
                    height: 100% !important;
                }

                /* Remove popup opening fade-in animation */
                body #root > div {
                    opacity: 1 !important;
                }

                /* Unset default current site's list item colors */
                body [cmdk-item][data-selected="true"] {
                    color: var(--str-color-text-neutral-subtle);
                    background: none;
                }

                /* Set the actual current site's list item colors */
                [cmdk-item][data-value="`+current_site_text+`"] {
                    background-color: #333 !important;
                    color: white !important;
                }
                body [cmdk-item]:hover,
                [cmdk-item][data-value="`+current_site_text+`"]:hover {
                    background-color: #666 !important;
                    color: white !important;
                }

                /* Site Selector Popup - Don't show Environments site list */
                /*
                [cmdk-group][role="presentation"][data-value="Environments"] {
                    display: none;
                }
                */
                [cmdk-group][role="presentation"][data-value="Environments"] > div:first-child,
                [cmdk-group][role="presentation"][data-value="Environments"] > div[cmdk-group-items] > [cmdk-item]{
                    display: none;
                }
                [cmdk-group][role="presentation"][data-value="Environments"] > div[cmdk-group-items] > [cmdk-item]:last-child {
                    display: block;
                }

                /* Align staging sites to the right and non-staging sites to the left*/
                [cmdk-group][data-value="WordPress sites"] [cmdk-item] {
                    width: 50%;
                }
                [cmdk-item][data-value*="Stg"],
                [cmdk-item][data-value*="stg"],
                [cmdk-item][data-value*="Staging"],
                [cmdk-item][data-value*="staging"] {
                    margin-left: 50%;
                    margin-top: -42px;
                }
                [cmdk-item][data-value*="Stg"] > div,
                [cmdk-item][data-value*="stg"] > div,
                [cmdk-item][data-value*="Staging"] > div,
                [cmdk-item][data-value*="staging"] > div {
                    justify-content: end;
                }

                /* Add in the old way to open the site selector by clicking the current site text */
                body header > div a[type="internal"][tabindex="0"][href*="/sites?"] + span + div:hover {
                    background: var(--str-color-bg-static-hovered-inverse-constant) !important;
                    color: var(--str-color-text-neutral-default-inverse) !important;
                    cursor: pointer;
                }

                div[id*="stratus-modal-"],
                div[id*="stratus-modal-"] > div,
                #stratus-modal-ljo2amc,
                #dialog-title {
                    opacity: 1 !important;
                    left: auto !important;
                    right: auto !important;
                }
            `;

            // Detect if the popup is open
            var is_popup_open = document.querySelector('body [cmdk-root].omnisearch');
            if ( is_popup_open ) {
                // Detect if a site item was clicked
                if ( e && e.target ) {
                    var clicked_site_item = false;
                    var testElement = e.target;
                    while ( testElement.parentElement ) {
                        if ( testElement.attributes['cmdk-item'] ) {
                            clicked_site_item = testElement;
                            break;
                        }
                        testElement = testElement.parentElement;
                    }
                    // Close the popup more quickly if a site item is clicked
                    if ( clicked_site_item ) {
                        var popups = document.querySelectorAll('body #root > div[style*="opacity: 1;"]');
                        if ( popups ) {
                            for ( var popup of popups ) {
                                popup.style.display = 'none';
                            }
                        }
                    }
                    // Detect if the click was within the popup
                    var clicked_within_popup = false;
                    var testElement = e.target;
                    while ( testElement.parentElement ) {
                        if (
                            testElement.attributes.position
                            && testElement.attributes.style
                            && testElement.attributes.position.value == 'top'
                            && testElement.attributes.style.value == 'opacity: 1;'
                        ) {
                            clicked_within_popup = true;
                            break;
                        }
                        testElement = testElement.parentElement;
                    }
                    // Close the popup more quickly if clicked outside of popup
                    if ( ! clicked_within_popup ) {
                        var popups = document.querySelectorAll('body #root > div[style*="opacity: 1;"]');
                        if ( popups ) {
                            for ( var popup of popups ) {
                                popup.style.display = 'none';
                            }
                        }
                    }
                    // Fix site links
                    /*
                    if ( clicked_site_item ) {
                        try {
                            var clicked_site_item_text = clicked_site_item.attributes['data-value'].value.toLowerCase();
                            var react_element = document.querySelector('[cmdk-group][data-value="WordPress sites"] [cmdk-group-items]');
                            var react_key = Object.keys( react_element ).find( key => {
                                return key.startsWith("__reactProps$");
                            });
                            var react_children = react_element[react_key].children.props.children;
                            for ( var react_child of react_children ) {
                                var id = react_child.props.wpSite.id;
                                var idEnvironment = react_child.props.wpSite.idEnvironment;
                                var idCompany = react_child.props.wpSite.idCompany;
                                var displayName = react_child.props.wpSite.displayName;
                                var environmentName = react_child.props.wpSite.environmentName;
                                var this_site_item_text = (displayName + ' ' + environmentName).toLowerCase();

                                // var current_item_site_text = current_site_text.toLowerCase();
                                // if ( this_site_item_text == current_item_site_text ) {
                                //     var current_id = react_child.props.wpSite.id;
                                //     var current_idEnvironment = react_child.props.wpSite.idEnvironment;
                                //     var current_idCompany = react_child.props.wpSite.idCompany;
                                //     var current_displayName = react_child.props.wpSite.displayName;
                                //     var current_environmentName = react_child.props.wpSite.environmentName;
                                // }

                                if ( this_site_item_text == clicked_site_item_text ) {
                                    var redirect_link = location.href;
                                    var location_array_part1 = location.href.split('?')[0].split('/');
                                    var location_array_part2 = location.href.split('?')[1]

                                    if ( ! location_array_part1[3] ) {
                                        location_array_part1[3] = 'sites';
                                    }
                                    if ( ! location_array_part1[4] ) {
                                        location_array_part1[4] = 'details';
                                    }

                                    location_array_part1[5] = id;
                                    location_array_part1[6] = idEnvironment;

                                    var redirect_link = location_array_part1.join('/') + '?' + location_array_part2;
                                    // window.location.href = redirect_link;
                                }
                            }
                        } catch (e) {
                            console.error('****** CAUGHT ****** : react_element key existence error');
                        }
                    }
                    */
                }
            }
        }

        // Begin once current site button is detected
        let mutationObserver = new MutationObserver( function() {
            var current_site_btn = document.querySelector('body header > div a[type="internal"][tabindex="0"][href*="/sites?"] + span + div');
            if ( current_site_btn ) {
                // Add in the old way to open the site selector by clicking the current site text
                current_site_btn.addEventListener( 'click', function() {
                    document.querySelector('body header > div  input[type="text"]').click();
                } );
                this.disconnect();
                mutation();
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

        // Run again on click just incase current site changes on same page load
        addEventListener( 'mouseup', mutation );

        // On-Click event for things that happen between mouseup and click
        addEventListener( 'click', function() {
            // Re-order sites case-insensetive alphabetically
            var site_elements = document.querySelectorAll('[cmdk-group][data-value="WordPress sites"] [cmdk-group-items] > div');
            if ( site_elements ) {
                var last_site_element = null;
                for ( var site_element of site_elements ) {
                    if ( last_site_element ) {
                    var site_text = site_element.innerText.toLowerCase();
                        var last_site_text = last_site_element.innerText.toLowerCase();

                        if ( last_site_text > site_text ) {
                        site_element.parentElement.insertBefore(site_element, last_site_element);
                        }
                    }
                    last_site_element = site_element;
                }
            }
        } );

    } );
})();
