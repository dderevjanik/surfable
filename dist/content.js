/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MessageReceiver_1 = __webpack_require__(2);
	MessageReceiver_1.messageReceiver();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Messages_1 = __webpack_require__(3);
	var Toast_1 = __webpack_require__(4);
	var body = document.getElementsByTagName('body')[0];
	/*
	 * Will listen on events/messages incoming from other parts of extension
	 */
	exports.messageReceiver = function () {
	    console.log('listening to messages');
	    console.log(chrome);
	    console.log(chrome.runtime);
	    chrome.runtime.onMessage.addListener(function (message) {
	        console.log('message');
	        if (message.target === 1 /* CONTENT */) {
	            console.log('targeted');
	            switch (message.type) {
	                case Messages_1.MESSAGE.SHOW_TOAST: {
	                    var toast = Toast_1.Toast(message.title, message.text, message.level);
	                    body.insertAdjacentHTML('beforeend', toast);
	                    break;
	                }
	                default: {
	                    throw new Error("Unexpected message's type: " + message.type);
	                }
	            }
	        }
	        else {
	        }
	    });
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.MESSAGE = {
	    NOTHING: 'NOTHING',
	    TAB_NEW: 'TAB_NEW',
	    TAB_RELOAD: 'TAB_RELOAD',
	    TAB_DUPLICATE: 'TAB_DUPLICATE',
	    TAB_CLOSE: 'TAB_CLOSE',
	    TAB_CLOSE_ALL: 'TAB_CLOSE_ALL',
	    TAB_SWITCH: 'TAB_SWITCH',
	    PRINT_PAGE: 'PRINT_PAGE',
	    WINDOW_CLOSE: 'WINDOW_CLOSE',
	    BOOKMARK_ADD: 'BOOKMARKD_ADD',
	    ZOOM: 'ZOOM',
	    CAPTURE: 'CAPTURE',
	    SHOW_FAVORITES: 'SHOW_FAVORITES',
	    GET_FAVORITES: 'GET_FAVORITES',
	    SYNC_TABS: 'SYNC_TABS',
	    SYNC_TABS_REQUEST: 'SYNC_TABS_REQUEST',
	    SHOW_TOAST: 'SHOW_TOAST',
	    SEARCH_CHANGE: 'SEARCH_CHANGE'
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var style = function (level) {
	    console.log('creting elvels');
	    switch (level) {
	        case 3 /* ERROR */: {
	            return "";
	        }
	        case 0 /* NORMAL */: {
	            return "";
	        }
	        case 1 /* SUCCESS */: {
	            return "";
	        }
	        case 2 /* WARNING */: {
	            return "";
	        }
	        default: {
	            throw new Error("Unexpected toast's level: " + level);
	        }
	    }
	};
	exports.Toast = function (title, text, level) { return "\n\t<div id=\"xasj4lml\" style=\"" + style(level) + "\">\n\t\t<div>" + title + "</div>\n\t\t<div>" + text + "</div>\n\t</div>\n"; };


/***/ }
/******/ ]);
