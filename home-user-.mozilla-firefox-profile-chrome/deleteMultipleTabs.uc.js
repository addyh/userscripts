// ==UserScript==
// @name            deleteMultipleTabs
// @author          addyh
// @include         main
// ==/UserScript==

(function() {

	document.onkeydown = function(e) {

		if (e.key == 'Delete' && gBrowser.multiSelectedTabsCount) {
			gBrowser.removeMultiSelectedTabs();
			return false;
		}

	}

})();
