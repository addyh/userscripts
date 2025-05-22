// ==UserScript==
// @name         Fix Print to PDF Sizes
// @description  Disable website print size overrides
// @version      2025.05.22.163304
// @author       addyh
// @copyright    GPLv3
// @icon         https://vectorified.com/images/print-icon-png-19.png
// @updateURL    https://github.com/addyh/userscripts/raw/master/fix-print-to-pdf.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/fix-print-to-pdf.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-end
// @grant        none
//
// @match        *://*/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-fix-print-to-pdf-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.textContent = `
			@media print {
				@page {
					size: auto !important;
					margin: auto !important;
				}
			}
		`;
		document.head.appendChild(style);
	}

})();
