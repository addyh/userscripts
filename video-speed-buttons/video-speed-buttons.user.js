// ==UserScript==
// @name         Video Speed Buttons
// @description  Add speed buttons to any HTML5 <video> element. Comes with a loader for YouTube and Vimeo
// @namespace    addyh
// @version      1.0.9.2.004
// @copyright    2017 Braden Best, 2021-2022 addyh
// @run-at       document-end
// @author       addyh
// @grant        none
//
// @match        *://*.youtube.com/*
// @match        *://*.vimeo.com/*
// @match        *://*.yewtu.be/*
// ==/UserScript==

// Original Source:
// https://greasyfork.org/en/scripts/30506-video-speed-buttons
// https://gitlab.com/bradenbest/video-speed-buttons

// warning: vimeo support is broken. A fix will be added in a future patch

// To add a new site: add a @match above, and modify vsb_loader_data.container_candidates near the bottom

function video_speed_buttons(anchor, video_el) {
    if (!anchor || !video_el) {
        // console.log('fail: no anchor or no video_el');
        return null;
    }

    let video_playback_speed = getCookie("video_playback_speed");
    if (!video_playback_speed) {
        video_playback_speed = 3;
    }

    const COLOR_SELECTED = "#FF5500",
        COLOR_NORMAL = "grey",
        BUTTON_SIZE = "11px",
        DEFAULT_SPEED = video_playback_speed,
        LABEL_TEXT = "",
        ALLOW_EXTERNAL_ACCESS = false;

    const BUTTON_TEMPLATES = [
        ["25%",    0.25],
        ["50%",    0.5],
        ["Normal", 1],
        ["1.50x",  1.5],
        ["2.00x",  2],
        ["2.25x",  2.25],
        ["2.50x",  2.5],
        ["2.75x",  2.75],
        ["3.00x",  3],
        ["3.25x",  3.25],
        ["3.50x",  3.5],
        ["3.75x",  3.75],
        ["4.00x",  4]
    ];

    const buttons = {
        head:      null,
        selected:  null,
        last:      null
    };

    const keyboard_controls = [
        ["-", "Speed Down", function(ev) {
            if (is_comment_box(ev.target))
                return false;

            (buttons.selected || buttons.head)
                .getprev()
                .el
                .dispatchEvent(new MouseEvent("click"));
        }],
        ["+", "Speed Up", function(ev) {
            if (is_comment_box(ev.target))
                return false;

            (buttons.selected || buttons.head)
                .getnext()
                .el
                .dispatchEvent(new MouseEvent("click"));
        }],
        ["*", "Reset Speed", function(ev) {
            let selbtn = buttons.head;
            let result = null;

            if (is_comment_box(ev.target))
                return false;

            while(selbtn !== null && result === null)
                if (selbtn.speed === DEFAULT_SPEED)
                    result = selbtn;
                else
                    selbtn = selbtn.next;

            if (result === null)
                result = buttons.head;

            result.el.dispatchEvent(new MouseEvent("click"));
        }],
        ["?", "Show Help", function(ev) {
            let infobox;

            if (is_comment_box(ev.target))
                return false;

            (infobox = Infobox(container))
                .log("Keyboard Controls (click to close)<br>");

            keyboard_controls.forEach(function([key, description]) {
                infobox.log(`    [${key}]  ${description}<br>`);
            });
        }]
    ];

    const container = (function() {
        let div = document.createElement("div");
        let prev_node = null;

        div.className = "vsb-container";
        div.style.borderBottom = "1px solid #ccc";
        div.style.marginBottom = "10px";
        div.style.paddingBottom = "10px";
        div.style.textAlign = "center";
        div.style.width = "100%";
        div.appendChild(SpeedButtonLabel(LABEL_TEXT));

        BUTTON_TEMPLATES.forEach(function(button) {
            let speedButton = SpeedButton(...button, div);

            if (buttons.head === null)
                buttons.head = speedButton;

            if (prev_node !== null) {
                speedButton.prev = prev_node;
                prev_node.next = speedButton;
            }

            prev_node = speedButton;

            if (speedButton.speed == DEFAULT_SPEED) {
                speedButton.select();
            }
        });

        return div;
    })();

    function is_comment_box(el) {
        const candidate = [
            ".comment-simplebox-text",
            "textarea"
        ].map(c => document.querySelector(c))
         .find(el => el !== null);

        if (candidate === null) {
            logvsb("video_speed_buttons::is_comment_box", "no candidate for comment box. Assuming false.");
            return 0;
        }

        return el === candidate;
    }

    function Infobox(parent) {
        let el = document.createElement("pre");

        el.style.font = "1em monospace";
        el.style.borderTop = "1px solid #ccc";
        el.style.marginTop = "10px";
        el.style.paddingTop = "10px";

        el.addEventListener("click", function() {
            parent.removeChild(el);
        });

        parent.appendChild(el);

        function log(msg) {
            el.innerHTML += msg;
        }

        return {
            el,
            log
        };
    }

    function setPlaybackRate(el, rate) {

        // console.log( ' setting playback rate: ' + rate );
        // console.log('    - el: ');
        // console.log(el);

        if (el) {
            el.playbackRate = rate;
            setCookie("video_playback_speed", rate, "365");
        }
        else {
            logvsb("video_speed_buttons::setPlaybackRate", "video element is null or undefined", 1);
        }
    }

    function SpeedButtonLabel(text) {
        let el = document.createElement("span");

        el.innerHTML = text;
        el.style.marginRight = "10px";
        el.style.fontWeight = "bold";
        el.style.fontSize = BUTTON_SIZE;
        el.style.color = COLOR_NORMAL;

        return el;
    }

    function SpeedButton(text, speed, parent) {
        let el = SpeedButtonLabel(text);
        let self;

        el.style.cursor = "pointer";
        el.setAttribute('myspeed', speed);

        el.addEventListener("click", function() {
            // setPlaybackRate(video_el, speed);
            self.select();
        });

        parent.appendChild(el);

        function select() {
            if (buttons.last !== null) {
                buttons.last.el.style.color = COLOR_NORMAL;
                buttons.last.el.classList = '';
            }

            buttons.last = self;
            buttons.selected = self;
            el.style.color = COLOR_SELECTED;
            el.classList = 'me-selected';
            setPlaybackRate(video_el, speed);
        }

        function getprev() {
            if (self.prev === null)
                return self;

            return buttons.selected = self.prev;
        }

        function getnext() {
            if (self.next === null)
                return self;

            return buttons.selected = self.next;
        }

        return self = {
            el,
            text,
            speed,
            prev:  null,
            next:  null,
            select,
            getprev,
            getnext
        };
    }

    function kill() {
        anchor.removeChild(container);
        document.body.removeEventListener("keydown", ev_keyboard);
    }

    function set_video_el(new_video_el) {
        video_el = new_video_el;
    }

    function ev_keyboard(ev) {
        let match = keyboard_controls.find(([key, unused, callback]) => key === ev.key);
        let callback = (match || {2: ()=>null})[2];

        callback(ev);
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setPlaybackRate(video_el, DEFAULT_SPEED);
    anchor.insertBefore(container, anchor.firstChild);
    document.body.addEventListener("keydown", ev_keyboard);

    return {
        controls: keyboard_controls,
        buttons,
        kill,
        SpeedButton,
        Infobox,
        setPlaybackRate,
        is_comment_box,
        set_video_el,
        ALLOW_EXTERNAL_ACCESS,
    };
}

video_speed_buttons.from_query = function(anchor_q, video_q) {
    return video_speed_buttons(
            document.querySelector(anchor_q),
            document.querySelector(video_q));
}

// Multi-purpose Loader (defaults to floating on top right)
const vsb_loader_data = {
    container_candidates: [
        // YouTube
        "ytm-standalone-badge-supported-renderer.top-standalone-badge",
        "div#above-the-fold",
        "div#container.ytd-video-primary-info-renderer",
        "div#watch-header",
        "div#watch7-headline",
        "div#watch-headline-title",

        // Vimeo
        ".clip_info-wrapper",
        // Yewtu.be
        "div#player-container + div.h-box",
    ],

    css_div: [
        "position:    fixed",
        "top:         0",
        "right:       0",
        "zIndex:      100000",
        "background:  rgba(0, 0, 0, 0.8)",
        "color:       #eeeeee",
        "padding:     10px"
    ].map(rule => rule.split(/: */)),

    css_vsb_container: [
        "borderBottom:    none",
        "marginBottom:    0",
        "paddingBottom:   0",
    ].map(rule => rule.split(/: */))
};

function logvsb(where, msg, lvl = 0) {
    let logf = (["info", "error"])[lvl];

    console[logf](`[vsb::${where}] ${msg}`);
}

function loader_loop() {

    // console.log('loader loop');

    let vsbc = () => document.querySelector(".vsb-container");
    let candidate;
    let default_candidate;
    let vsb_handle;

    if ( document.querySelector('video') && document.querySelector('.me-selected') ) {
        if ( document.querySelector('video').playbackRate != document.querySelector('.me-selected').getAttribute('myspeed') ) {
            document.querySelector('video').playbackRate = document.querySelector('.me-selected').getAttribute('myspeed') 
        }
    }

    if (vsbc()) {
        // console.log('fail: already loaded');
        return;
    }

    candidate = vsb_loader_data
        .container_candidates
        .map(candidate => document.querySelector(candidate))
        .find(candidate => candidate !== null);

    default_candidate = (function() {
        let el = document.createElement("div");

        vsb_loader_data.css_div.forEach(function([name, value]) {
            el.style[name] = value; });

        return el;
    }());

    vsb_handle = video_speed_buttons(candidate || default_candidate, document.querySelector("video"));

    if (candidate === null) {
        logvsb("loader_loop", "no candidates for title section. Defaulting to top of page.");
        document.body.appendChild(default_candidate);

        vsb_loader_data.css_vsb_container.forEach(function([name, value]) {
            vsbc().style[name] = value;
        });
    }

    if (vsb_handle && vsb_handle.ALLOW_EXTERNAL_ACCESS) {
        window.vsb = vsb_handle;
    }

}

// ******************* SCRIPT START *******************

// Add css to page
var style = document.createElement('style');
style.innerHTML = `
/* Mobile padding */
div.related-chips-slot-wrapper.slot-open {
    transform: translateY(0);
}
/* Fix page will not scroll */
#player-container-id.sticky-player {
    position: absolute !important;
}
/* Fix Title being covered up by video */
div.slim-video-metadata-information-standalone-badge {
    padding: 10px 0 0 0;
}
/* Fix floating category chooser  */
ytm-related-chip-cloud-renderer {
    position: unset !important;
    height: auto !important;
    opacity: 1 !important;
    transform: unset !important;
}
/* Remove "Up Next" text bar */
.ytm-autonav-bar.cbox {
    display: none;
}
`;
document.head.append(style);

// Add jquery to page
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

// Fix recommended sidebar
function starting_loop() {
    jQuery.noConflict();
    jQuery('ytm-media-item').attr('use-vertical-layout', 'true');
}

// Run every second
setInterval(function() {
    if (document.readyState === "complete") {
        setTimeout(loader_loop, 10);
        setTimeout(starting_loop, 10);

        // Fixes
        var aaa, bbb, ccc;

        // Fix Category buttons list bar
        if (bbb = document.querySelector('.related-chips-slot-wrapper')) {
            bbb.classList='related-chips-slot-wrapper slot-open';
        }
        if (ccc = document.getElementsByTagName('ytm-related-chip-cloud-renderer')) {
            if (ccc[0]) {
                ccc[0].classList='chips-visible';
            }
        }
    }
}, 1000);

// Run on orientation change
// addEventListener('orientationchange', event => {
//     console.log('orientation changed');
//     loader_loop();
// });

// Run at start
let start = window.setInterval(function() {
    if (document.readyState === "complete") {
        // console.log('ending start');
        loader_loop();
        window.clearInterval(start);
    }
}, 10);

// Run on document change
let mutationObserver = new MutationObserver(function() {
    // console.log('mutation');
    loader_loop();
});

mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});
