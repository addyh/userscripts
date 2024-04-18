// ==UserScript==
// @name         Kinsta
// @description  MyKinsta Fixes
// @version      1.0.0
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
            var str = document.title.substring( 0, document.title.length - 11 ).replace( /\./g, '' );
            var style = document.createElement('style');
            style.innerHTML = `
                div[name="`+str+`"] {
                  background-color: #333;
                  border: 3px solid #333;
                }
                div[name="`+str+`"]:hover {
                  background-color: #000;
                }
            `;
            document.head.append(style);
        }
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

    } );
})();
