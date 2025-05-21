// ==UserScript==
// @name         ChatGPT
// @description  ChatGPT Fixes
// @version      2025.05.21.171640
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @updateURL    https://github.com/addyh/userscripts/raw/master/chatgpt.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/chatgpt.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-start
// @grant        none
//
// @match        https://*.chatgpt.com/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-chatgpt-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.innerHTML = `
			/* Remove Last Chat Message Preview on Project Pages */
			ol > li > a .truncate.text-token-text-secondary {
				display: none !important;
			}
		`;
		document.head.append(style);
	}

})();
