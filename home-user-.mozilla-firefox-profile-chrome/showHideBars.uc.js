// ==UserScript==
// @name            showHideBars
// @author          addyh
// @include         main
// ==/UserScript==

(function() {

	// #titlebar - Title/Tabs Bar
	// #nav-bar - Nav/Address Bar
	// #PersonalToolbar - Bookmarks Bar
	// #navigator-toolbox - Nav Bar, Title Bar, and Bookmarks Bar
	// CTRL+SHIFT+B still show/hides the bookmarks bar

	// document.getElementById('titlebar').style.visibility = 'collapse';
	// document.getElementById('nav-bar').style.visibility = 'collapse';
	// document.getElementById('PersonalToolbar').style.visibility = 'collapse';

	document.onkeydown = function(e) {

		// ALT + Z
		// Show/hide all top bars
		if (e.key == 'z' && e.altKey) {
			var t = document.getElementById('titlebar').style.visibility;
			var n = document.getElementById('nav-bar').style.visibility;
			var b = document.getElementById('PersonalToolbar').style.visibility;
			if ( t == 'collapse' || n == 'collapse' || b == 'collapse' ) {
				document.getElementById('titlebar').style.visibility = 'visible';
				document.getElementById('nav-bar').style.visibility = 'visible';
				document.getElementById('PersonalToolbar').style.visibility = 'visible';
			} else {
				document.getElementById('titlebar').style.visibility = 'collapse';
				document.getElementById('nav-bar').style.visibility = 'collapse';
				document.getElementById('PersonalToolbar').style.visibility = 'collapse';
			}
		}

		// ALT + X
		// Show/hide the title bar (tabs bar)
		if (e.key == 'x' && e.altKey) {
			var t = document.getElementById('titlebar').style.visibility;
			if ( t == 'collapse' ) {
				document.getElementById('titlebar').style.visibility = 'visible';
			} else {
				document.getElementById('titlebar').style.visibility = 'collapse';
			}
		}

		// ALT + A
		// Show/hide the nav bar (address bar)
		if (e.key == 'a' && e.altKey) {
			var n = document.getElementById('nav-bar').style.visibility;
			if ( n == 'collapse' ) {
				document.getElementById('nav-bar').style.visibility = 'visible';
			} else {
				document.getElementById('nav-bar').style.visibility = 'collapse';
			}
		}

	}

})();
