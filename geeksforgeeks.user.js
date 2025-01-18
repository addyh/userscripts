// ==UserScript==
// @name         geeksforgeeks.org
// @description  Fix scrolling on geeksforgeeks.org
// @version      2025.1.18.140838
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geeksforgeeks.org
// @updateURL    https://github.com/addyh/userscripts/raw/master/geeksforgeeks.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/geeksforgeeks.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-start
// @grant        none
//
// @match        https://*.geeksforgeeks.org/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-geeksforgeeks-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.innerHTML = `
			/* Fix scrolling on geeksforgeeks.org */
			body {
				height: auto !important;
			}
		`;
		document.head.prepend(style);
	}

})();
