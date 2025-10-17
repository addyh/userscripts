// ==UserScript==
// @name         YouTube Ads
// @description  Removes YouTube Ads
// @version      2025.10.17.152304
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://github.com/addyh/userscripts/raw/master/youtube-ads.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/youtube-ads.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-end
// @grant        none
//
// @match        *://*.youtube.com/*
// ==/UserScript==

function loader_loop() {

	// Search Page
	var remove = [
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
	var hide = [
		// Shorts and Community Posts
		'ytd-rich-section-renderer',
		'ytm-rich-section-renderer',
	];
	for ( var el of remove ) {
		var els = document.querySelectorAll( el );
		for ( var e of els ) {
			e.style.display = "none";
			e.remove();
		}
	}
	for ( var el of hide ) {
		var els = document.querySelectorAll( el );
		for ( var e of els ) {
			e.style.display = "none";
			// e.remove();
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
