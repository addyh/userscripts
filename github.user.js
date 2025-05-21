// ==UserScript==
// @name         Github
// @description  Github Fixes
// @version      2025.05.21.171655
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @updateURL    https://github.com/addyh/userscripts/raw/master/github.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/github.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-start
// @grant        none
//
// @match        https://*.github.com/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-github-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.innerHTML = `
			/* Remove Header Payment Ad */
			header ~ .flash.flash-full.js-notice.flash-warn {
				display: none !important;
			}
		`;
		document.head.prepend(style);
	}

})();
