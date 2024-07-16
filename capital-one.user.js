// ==UserScript==
// @name         Capital One
// @description  Capital One Fixes
// @version      2024.7.16.154458
// @author       addyh
// @copyright    GPLv3
// @updateURL    https://github.com/addyh/userscripts/raw/master/capital-one.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/capital-one.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-end
// @grant        none
//
// @match        https://*.capitalone.com/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-capital-one-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.innerHTML = `
			/* Show Longer Card Names on Mobile */
			.c1-ease-commerce-virtual-cards-manager__mobile-specific {
				display: none !important;
			}
			.c1-ease-commerce-virtual-cards-manager__desktop-specific {
				display: block !important;
			}
		`;
		document.head.append(style);
	}

})();
