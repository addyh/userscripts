// ==UserScript==
// @name            showHideBars
// @version         2024.12.1.111526
// @author          addyh
// @description     Add ALT+A/X/Z shortcuts to show/hide firefox toolbars. (A=address bar, X=title bar, Z=all toolbars)
// @include         main
// ==/UserScript==

(function() {

	// #TabsToolbar - Tabs Title Bar
	// #nav-bar - Nav/Address Bar
	// #PersonalToolbar - Bookmarks Bar
	// #navigator-toolbox - Nav Bar, Title Bar, and Bookmarks Bar
	// CTRL+SHIFT+B still show/hides the bookmarks bar

	window.addEventListener('keydown', function (e) {

		var titlebar = document.getElementById('TabsToolbar').style.visibility;
		var navbar = document.getElementById('nav-bar').style.visibility;
		var bookmarksbar = document.getElementById('PersonalToolbar').style.visibility;

		// ALT + Z
		// Show/hide all top bars
		if (e.key == 'z' && e.altKey) {
			if ( titlebar == 'collapse' || navbar == 'collapse' || bookmarksbar == 'collapse' ) {
				titlebar = 'visible';
				navbar = 'visible';
				bookmarksbar = 'visible';
			} else {
				titlebar = 'collapse';
				navbar = 'collapse';
				bookmarksbar = 'collapse';
			}
		}

		// ALT + X
		// Show/hide the title bar (tabs bar)
		if (e.key == 'x' && e.altKey) {
			if ( titlebar == 'collapse' ) {
				titlebar = 'visible';
			} else {
				titlebar = 'collapse';
			}
		}

		// ALT + A
		// Show/hide the nav bar (address bar)
		if (e.key == 'a' && e.altKey) {
			if ( navbar == 'collapse' ) {
				navbar = 'visible';
			} else {
				navbar = 'collapse';
			}
		}

		document.getElementById('TabsToolbar').style.visibility = titlebar;
		document.getElementById('nav-bar').style.visibility = navbar;
		document.getElementById('PersonalToolbar').style.visibility = bookmarksbar;

	});

})();
