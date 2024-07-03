// ==UserScript==
// @name         Kinsta
// @description  MyKinsta Fixes
// @version      2024.7.3.160423
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

window.KINSTA_API_KEY = window.KINSTA_API_KEY || localStorage.getItem( 'KINSTA_API_KEY' );
window.KINSTA_COMPANY_ID = window.KINSTA_COMPANY_ID || localStorage.getItem( 'KINSTA_COMPANY_ID' );
window.mySites = [];

get_kinsta_sites();

function get_kinsta_sites() {
    try {
        let my_sites = sessionStorage.getItem( 'mySites' );
        let exp_time = parseInt( sessionStorage.getItem( 'mySites_expiration' ) );
        let current_time = Math.round( (new Date()).getTime() / 1000 );
        let is_expired = ! exp_time || ( exp_time && ( current_time > exp_time ) );
        if ( my_sites && ! is_expired ) {
            window.mySites = JSON.parse( my_sites );
        } else {
            update_kinsta_sites();
        }
    } catch {
        update_kinsta_sites();
    }
}

function save_kinsta_sites() {
    let ttl = 60 * 60; // 1 hour
    let current_time = Math.round( (new Date()).getTime() / 1000 );
    sessionStorage.setItem( 'mySites_expiration', current_time + ttl );
    sessionStorage.setItem( 'mySites', JSON.stringify( window.mySites ) );
    return;
}

function update_kinsta_sites() {
    if ( window.KINSTA_API_KEY ) {
        const query = new URLSearchParams({
            company: window.KINSTA_COMPANY_ID
        }).toString();
        fetch( 'https://api.kinsta.com/v2/sites?' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + window.KINSTA_API_KEY
            }
        })
        .then( response => response.json() )
        .then( data => {
            if ( data && data.company && data.company.sites ) {
                request_kinsta_sites( data.company.sites );
            }
        })
        .catch( error => {
            console.error( 'Error: ', error );
        });
    }
}

function request_kinsta_sites( site_list ) {
    if ( site_list && site_list.length ) {
        window.mySites = [];
        for ( let i = 0; i < site_list.length; i++ ) {
            fetch( 'https://api.kinsta.com/v2/sites/' + site_list[i].id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + window.KINSTA_API_KEY
                }
            })
            .then( response => response.json() )
            .then( data => {
                if ( data && data.site ) {
                    window.mySites.push( data.site );
                    if ( window.mySites.length == site_list.length ) {
                        save_kinsta_sites();
                    }
                }
            })
            .catch( error => {
                console.error( 'Error: ', error );
            });
        }
    }
}

function rand_num( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

(function() {

    window.addEventListener( 'load', function() {

        function mutation( e ) {

            if ( window.mySites && ! window.mySites.length ) {
                update_kinsta_sites();
            }

            // Insert Custom CSS
            let current_site_text = 'Qoz8eHscvwbAKdZG552zjrOGlSHmhpWq';
            let current_site_btn = document.querySelector('body header > div a[type="internal"][tabindex="0"][href*="/sites?"] + span + div');
            if ( current_site_btn ) {
                current_site_text = current_site_btn.innerText.replace( /\n/g, ' ' );
            }
            let style = document.getElementById('userscript-kinsta-custom-css');
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

                /* Fix First Item Spacing */
                body [cmdk-item] {
                    margin-bottom: var(--str-space-50, 4px);
                }

                /* Unset default current site's list item colors */
                body [cmdk-item][data-selected="true"] {
                    color: var(--str-color-text-neutral-subtle);
                    background: none;
                }

                /* Set the actual current site's list item colors */
                [cmdk-item][data-value="`+current_site_text+` recent"],
                [cmdk-item][data-value="`+current_site_text+`"] {
                    background-color: #333 !important;
                    color: white !important;
                }
                body [cmdk-item]:hover,
                [cmdk-item][data-value="`+current_site_text+` recent"]:hover,
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
                [cmdk-group][data-value="Recent"] [cmdk-item],
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

                /* All WordPress Sites - Custom - Staging - fix margin and color */
                [cmdk-item][kinsta-redirect-url][data-value*="Stg"],
                [cmdk-item][kinsta-redirect-url][data-value*="stg"],
                [cmdk-item][kinsta-redirect-url][data-value*="Staging"],
                [cmdk-item][kinsta-redirect-url][data-value*="staging"] {
                    /* margin-top: -39px; */
                }
                [cmdk-item][kinsta-redirect-url][data-value*="Stg"] > div > svg + div > div,
                [cmdk-item][kinsta-redirect-url][data-value*="stg"] > div > svg + div > div,
                [cmdk-item][kinsta-redirect-url][data-value*="Staging"] > div > svg + div > div,
                [cmdk-item][kinsta-redirect-url][data-value*="staging"] > div > svg + div > div {
                    background-color: var(--str-color-icon-neutral-subtlest);
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
            let is_popup_open = document.querySelector('body [cmdk-root].omnisearch');
            if ( is_popup_open ) {
                // Detect if a site item was clicked
                if ( e && e.target ) {
                    let clicked_site_item = false;
                    let testElement = e.target;
                    while ( testElement.parentElement ) {
                        if ( testElement.attributes['cmdk-item'] ) {
                            clicked_site_item = testElement;
                            break;
                        }
                        testElement = testElement.parentElement;
                    }
                    // Close the popup more quickly if a site item is clicked
                    if ( clicked_site_item ) {
                        let popups = document.querySelectorAll('body #root > div[style*="opacity: 1;"]');
                        if ( popups ) {
                            for ( let popup of popups ) {
                                popup.style.display = 'none';
                            }
                        }
                    }
                    // Detect if the click was within the popup
                    let clicked_within_popup = false;
                    testElement = e.target;
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
                        let popups = document.querySelectorAll('body #root > div[style*="opacity: 1;"]');
                        if ( popups ) {
                            for ( let popup of popups ) {
                                popup.style.display = 'none';
                            }
                        }
                    }
                }
            }

            // If Kinsta is showing "Recent" sites only
            if ( document.querySelectorAll('[cmdk-group][data-value="Recent"] > [cmdk-group-heading]').length ) {
                document.querySelector('[cmdk-group][data-value="Recent"] > [cmdk-group-heading]').innerText = 'All WordPress Sites';
                let site_elements = document.querySelectorAll('[cmdk-group][data-value="Recent"] [cmdk-group-items] > div');
                if ( site_elements && site_elements.length ) {
                    let new_element = site_elements[0].cloneNode(true);
                    let parentElement = site_elements[0].parentElement;
                    let first_element_id = 'the_first_element_' + rand_num( 9999, 99999 );
                    new_element.id = first_element_id;
                    parentElement.innerHTML = '';
                    parentElement.appendChild( new_element );
                    if ( window.mySites && window.mySites.length ) {
                        for ( let site of window.mySites ) {
                            for ( let env of site.environments ) {
                                new_element = site_elements[0].cloneNode(true);
                                parentElement.appendChild( new_element );
                                let site_name = site.display_name;
                                let site_env = env.display_name;
                                let original_site_name = new_element.querySelector('div > svg + div').innerText.split('\n')[0];
                                let original_site_env = new_element.querySelector('div > svg + div').innerText.split('\n')[1];
                                new_element.querySelector('div > svg + div').innerHTML = new_element.querySelector('div > svg + div').innerHTML.replaceAll( original_site_name, site_name );
                                new_element.querySelector('div > svg + div').innerHTML = new_element.querySelector('div > svg + div').innerHTML.replaceAll( original_site_env, site_env );
                                new_element.id = ":rx" + rand_num( 9999, 99999 ) + ":";
                                new_element.onclick = function(e) {
                                    e.preventDefault();
                                    window.location.href = this.getAttribute( 'kinsta-redirect-url' );
                                    return false;
                                };
                                let location_array_part1 = location.href.split('?')[0].split('/');
                                let location_array_part2 = location.href.split('?')[1]
                                if ( ! location_array_part1[3] ) {
                                    location_array_part1[3] = 'sites';
                                }
                                if ( ! location_array_part1[4] ) {
                                    location_array_part1[4] = 'details';
                                }
                                location_array_part1[5] = site.id;
                                location_array_part1[6] = env.id;
                                let redirect_link = location_array_part1.join('/') + '?' + location_array_part2;
                                new_element.setAttribute( 'kinsta-redirect-url', redirect_link );
                                new_element.setAttribute( 'data-value', site_name + ' ' + site_env + ' recent' );
                            }
                        }
                        document.querySelector( '#' + first_element_id ).remove();
                    }
                }
            }

            // Re-order sites alphabetically
            let site_elements = document.querySelectorAll('[cmdk-group][data-value="WordPress sites"] [cmdk-group-items] > div');
            if ( ! site_elements || ( site_elements && ! site_elements.length ) ) {
                site_elements = document.querySelectorAll('[cmdk-group][data-value="Recent"] [cmdk-group-items] > div');
            }
            if ( site_elements && site_elements.length ) {
                let sites = Array.prototype.slice.call( site_elements, 0 );
                sites.sort( function( a,b ) {
                    return a.innerText.localeCompare( b.innerText );
                });
                for ( let i = 0; i < sites.length; i++ ) {
                    site_elements[0].parentElement.appendChild( sites[i] );
                }
            }
        }

        // Begin once current site button is detected
        let mutationObserver = new MutationObserver( function() {
            let current_site_btn = document.querySelector('body header > div a[type="internal"][tabindex="0"][href*="/sites?"] + span + div');
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

        // Run again on click for when the current site changes on same page load
        addEventListener( 'click', mutation );

    } );
})();
