// ==UserScript==
// @name            deleteMultipleTabs
// @version         2024.12.1.111204
// @author          addyh
// @description     After ctrl+ or shift+ clicking multiple tabs, allow pressing the Delete key to close those tabs.
// @include         main
// ==/UserScript==

(function() {

	window.addEventListener('keydown', function (e) {

		if (e.key == 'Delete' && gBrowser.multiSelectedTabsCount) {
			gBrowser.removeMultiSelectedTabs();
			return false;
		}

	});

})();
