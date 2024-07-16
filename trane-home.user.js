// ==UserScript==
// @name         Trane Home
// @description  Fixes login page
// @version      1.0.3
// @author       addyh
// @copyright    GPLv3
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
