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
	var All_1 = __webpack_require__(2);
	chrome.runtime.onMessage.addListener(function (message, sender) {
	    switch (message.type) {
	        case All_1.TAB_CLOSE: {
	            chrome.tabs.query({ active: true }, function (payload) {
	                chrome.tabs.remove(payload[0].id);
	            });
	            break;
	        }
	        case All_1.TAB_NEW: {
	            if (message.url.length > 0) {
	                chrome.tabs.create({ url: message.url });
	            }
	            else {
	                chrome.tabs.create({});
	            }
	            break;
	        }
	        case All_1.BOOKMARK_ADD: {
	            chrome.tabs.query({ active: true }, function (payload) {
	                var activeTab = payload[0];
	                chrome.bookmarks.create({ title: activeTab.title, url: activeTab.url });
	            });
	            break;
	        }
	        case All_1.BOOKMARK_ADD_AS: {
	            chrome.bookmarks.create({ title: message.title, url: sender.url });
	            break;
	        }
	        case All_1.CAPTURE: {
	            break;
	        }
	    }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BookmarkAdd_1 = __webpack_require__(3);
	exports.BOOKMARK_ADD = BookmarkAdd_1.BOOKMARK_ADD;
	var BookmarkAddAs_1 = __webpack_require__(4);
	exports.BOOKMARK_ADD_AS = BookmarkAddAs_1.BOOKMARK_ADD_AS;
	var TabClose_1 = __webpack_require__(5);
	exports.TAB_CLOSE = TabClose_1.TAB_CLOSE;
	var TabNew_1 = __webpack_require__(6);
	exports.TAB_NEW = TabNew_1.TAB_NEW;
	var Zoom_1 = __webpack_require__(7);
	exports.ZOOM = Zoom_1.ZOOM;
	var Capture_1 = __webpack_require__(8);
	exports.CAPTURE = Capture_1.CAPTURE;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.BOOKMARK_ADD = 'BOOKMARK_ADD';
	;
	/**
	 * Add current page to bookmarks
	 */
	exports.bookmarkAdd = function () { return ({
	    type: exports.BOOKMARK_ADD
	}); };


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.BOOKMARK_ADD_AS = 'BOOKMARK_ADD_AS';
	;
	exports.bookmarkAddAs = function (bookmarkTitle) { return ({
	    type: exports.BOOKMARK_ADD_AS,
	    title: bookmarkTitle
	}); };


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	exports.TAB_CLOSE = 'TAB_CLOSE';
	;
	/**
	 * Close current page
	 */
	exports.tabClose = function () { return ({
	    type: exports.TAB_CLOSE,
	}); };


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	exports.TAB_NEW = 'TAB_NEW';
	;
	/**
	 * Open a new tab with specific url.
	 * @param {string} url - url to open. When empty, it'll open a blank page
	 */
	exports.tabNew = function (url) { return ({
	    type: exports.TAB_NEW,
	    url: url
	}); };


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.ZOOM = 'ZOOM';
	;
	/**
	 * Add current page to bookmarks
	 */
	exports.Zoom = function (zoomType) { return ({
	    type: exports.ZOOM,
	    zoomType: zoomType
	}); };


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	exports.CAPTURE = 'CAPTURE';
	;
	exports.capture = function (captureType) { return ({
	    type: exports.CAPTURE,
	    captureType: captureType
	}); };


/***/ }
/******/ ]);