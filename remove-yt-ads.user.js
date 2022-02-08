// ==UserScript==
// @name         Remove YouTube Ads - Search Page
// @description  Removes ads on youtube searches
// @version      1.0.0
// @run-at       document-end
// @namespace    addyh
// @copyright    addyh
// @author       addyh
// @grant        none
//
// @match        *://*.youtube.com/*
// ==/UserScript==

function loader_loop(){

    // Search Page
    var ads = [
        'ytd-promoted-sparkles-web-renderer',
        'ytd-promoted-sparkles-text-search-renderer'
    ];
    for (var ad of ads) {
        var els = document.querySelectorAll(ad);
        for (var e of els) {
            e.style.display = "none";
            e.remove();
        }
    }
}

let start = window.setInterval(function(){
    if (document.readyState === "complete") {
        window.clearInterval(start);
        loader_loop();
    }
}, 10);

let mutationObserver = new MutationObserver(function() {
    loader_loop();
});

mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});
