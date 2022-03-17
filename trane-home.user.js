// ==UserScript==
// @name         Trane Home
// @description  Fixes login page
// @version      1.0.0
// @run-at       document-end
// @namespace    addyh
// @copyright    addyh
// @author       addyh
// @grant        none
//
// @match        https://*.tranehome.com/login
// ==/UserScript==


(function() {

    document.querySelector('input[type="text"][style="display:none"]').remove()
    document.querySelector('input[type="password"][style="display:none"]').remove()

})();
