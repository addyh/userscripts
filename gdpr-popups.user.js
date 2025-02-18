// ==UserScript==
// @name         GDPR Popups
// @description  Remove GDPR Popups / Consent Banners From All Sites
// @version      2025.1.18.140359
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gdpr.eu
// @updateURL    https://github.com/addyh/userscripts/raw/master/gdpr-popups.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/gdpr-popups.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-start
// @grant        none
//
// @match        *://*/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-gdpr-popups-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.innerHTML = `
			#ccpaCookieBanner,
			.wd-cookies-popup,
			.wcc-consent-container,
			.js-consent-banner,
			#onetrust-consent-sdk
			{
				display: none;
			}
		`;
		document.head.prepend(style);
	}

})();
