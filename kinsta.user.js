// ==UserScript==
// @name         Kinsta
// @description  MyKinsta Fixes
// @version      1.0.2
// @author       addyh
// @copyright    GPLv3
// @updateURL    https://github.com/addyh/userscripts/raw/master/kinsta.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/kinsta.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-end
// @grant        none
//
// @match        https://my.kinsta.com/sites/*
// ==/UserScript==

(function() {
    window.addEventListener( 'load', function() {

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

    } );
})();
