// ==UserScript==
// @name         Amazon
// @description  Amazon Fixes
// @version      2025.1.18.134406
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @updateURL    https://github.com/addyh/userscripts/raw/master/amazon.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/amazon.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-start
// @grant        none
//
// @match        https://*.amazon.com/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-amazon-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.innerHTML = `
			/* Remove Header Ad */
			#desktop-banner,

			/* Remove Entire Footer */
			#navFooter {
				display: none !important;
			}
		`;
		document.head.prepend(style);
	}

})();
