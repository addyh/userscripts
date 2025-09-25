// ==UserScript==
// @name         Trane Home
// @description  Trane Home Login Page - Fix Autofill
// @version      2025.09.5.024850
// @author       addyh
// @copyright    GPLv3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tranehome.com
// @updateURL    https://github.com/addyh/userscripts/raw/master/trane-home.user.js
// @downloadURL  https://github.com/addyh/userscripts/raw/master/trane-home.user.js
// @supportURL   https://github.com/addyh/userscripts/issues
// @homepage     https://github.com/addyh/userscripts
// @run-at       document-end
// @grant        none
//
// @match        https://*.tranehome.com/login
// ==/UserScript==


(function() {

	document.querySelector('input[type="text"][style="display:none"]').remove()
	document.querySelector('input[type="password"][style="display:none"]').remove()

})();
