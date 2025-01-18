// ==UserScript==
// @name         Stack Overflow Sites
// @description  Clean Up All Stack Overflow Sites
// @version      2025.1.18.135819
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @updateURL    https://github.com/addyh/userscripts/raw/master/stack-overflow-sites.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/stack-overflow-sites.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-start
// @grant        none
//
// @match        https://*.stackoverflow.com/*
// @match        https://*.stackexchange.com/*
// @match        https://*.superuser.com/*
// @match        https://*.mathoverflow.com/*
// @match        https://*.serverfault.com/*
// @match        https://*.askubuntu.com/*
// @match        https://*.stackapps.com/*
// ==/UserScript==

(function() {

	let style_id = 'userscript-stack-overflow-sites-custom-css';
	let style = document.getElementById( style_id );
	if ( !style ) {
		style = document.createElement('style');
		style.id = style_id;
		style.innerHTML = `
			#credential_picker_container,           /* Sign In With Google popup */
			.s-popover,                             /* AI powered search popup */
			.js-dismissable-hero,                   /* Top Banner */
			#announcement-banner,                   /* Top Banner */
			.js-zone-container.zone-container-main, /* Ads */
			#left-sidebar,                          /* Left Sidebar */
			#sidebar .s-sidebarwidget__yellow,      /* Right Sidebar Yellow Boxes */
			#hot-network-questions,                 /* Right Sidebar - Hot Network Questions */
			.js-consent-banner                      /* GDPR Popup */
			{
				display: none !important;
			}
		`;
		document.head.prepend(style);
	}

})();
