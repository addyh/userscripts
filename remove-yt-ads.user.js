// ==UserScript==
// @name         Remove YouTube Ads
// @description  Removes ads on youtube
// @version      1.0.7
// @author       addyh
// @copyright    GPLv3
// @updateURL    https://github.com/addyh/userscripts/raw/master/remove-yt-ads.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/remove-yt-ads.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-end
// @grant        none
//
// @match        *://*.youtube.com/*
// ==/UserScript==

function loader_loop() {

    // Search Page
    var ads = [
        'ytd-display-ad-renderer',
        'ytm-display-ad-renderer',
        'ytd-promoted-sparkles-web-renderer',
        'ytm-promoted-sparkles-web-renderer',
        'ytd-promoted-sparkles-text-search-renderer',
        'ytm-promoted-sparkles-text-search-renderer',
        'ytd-clarification-renderer',
        'ytm-clarification-renderer',

        // These interfere with the edit comment popup
        // 'ytd-popup-container',
        // 'ytm-popup-container',
    ];
    for ( var ad of ads ) {
        var els = document.querySelectorAll( ad );
        for ( var e of els ) {
            e.style.display = "none";
            e.remove();
        }
    }
}

let start = window.setInterval( function() {
    if ( document.readyState === "complete" ) {
        window.clearInterval( start );
        loader_loop();
    }
}, 10 );

let mutationObserver = new MutationObserver( function() {
    loader_loop();
} );

mutationObserver.observe( document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
} );
