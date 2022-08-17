// ==UserScript==
// @name            showHideBars
// @author          addyh
// @include         main
// ==/UserScript==

UC.showHideBars = {
	init: function () {

		// #titlebar - Title/Tabs Bar
		// #nav-bar - Nav/Address Bar
		// #PersonalToolbar - Bookmarks Bar
		// #navigator-toolbox - Nav Bar, Title Bar, and Bookmarks Bar

		// document.getElementById('titlebar').style.visibility = 'collapse';
		// document.getElementById('nav-bar').style.visibility = 'collapse';
		// document.getElementById('PersonalToolbar').style.visibility = 'collapse';

		document.onkeydown = function(e) {

			if (e.key == 'z' && e.altKey) {
				var t = document.getElementById('titlebar').style.visibility;
				if ( t == 'collapse' ) {
					document.getElementById('titlebar').style.visibility = 'visible';
					document.getElementById('nav-bar').style.visibility = 'visible';
					document.getElementById('PersonalToolbar').style.visibility = 'visible';
				} else {
					document.getElementById('titlebar').style.visibility = 'collapse';
					document.getElementById('nav-bar').style.visibility = 'collapse';
					document.getElementById('PersonalToolbar').style.visibility = 'collapse';
				}
			}

			if (e.key == 'a' && e.altKey) {
				var t = document.getElementById('titlebar').style.visibility;
				var n = document.getElementById('nav-bar').style.visibility;
				if ( n == 'collapse' ) {

					if ( t == 'collapse' ) {
						document.getElementById('titlebar').style.visibility = 'visible';
					} else {
						document.getElementById('nav-bar').style.visibility = 'visible';
						document.getElementById('PersonalToolbar').style.visibility = 'visible';
					}
				} else {
					document.getElementById('nav-bar').style.visibility = 'collapse';
					document.getElementById('PersonalToolbar').style.visibility = 'collapse';
				}
			}
		}
	}
}

UC.showHideBars.init();
