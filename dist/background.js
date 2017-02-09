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
	var MessageListener_1 = __webpack_require__(2);
	MessageListener_1.messageListener();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Message = __webpack_require__(3);
	exports.messageListener = function () {
	    chrome.runtime.onMessage.addListener(function (message, sender) {
	        switch (message.type) {
	            case Message.TAB_CLOSE: {
	                chrome.tabs.query({ active: true }, function (payload) {
	                    chrome.tabs.remove(payload[0].id);
	                });
	                break;
	            }
	            case Message.TAB_NEW: {
	                if (message.url.length > 0) {
	                    chrome.tabs.create({ url: message.url });
	                }
	                else {
	                    chrome.tabs.create({});
	                }
	                break;
	            }
	            case Message.BOOKMARK_ADD: {
	                chrome.tabs.query({ active: true }, function (payload) {
	                    var activeTab = payload[0];
	                    chrome.bookmarks.create({ title: activeTab.title, url: activeTab.url });
	                });
	                break;
	            }
	            case Message.BOOKMARK_ADD_AS: {
	                chrome.bookmarks.create({ title: message.title, url: sender.url });
	                break;
	            }
	            case Message.TAB_RELOAD: {
	                chrome.tabs.query({ active: true }, function (payload) {
	                    chrome.tabs.reload(payload[0].id);
	                });
	                break;
	            }
	            case Message.TAB_DUPLICATE: {
	                chrome.tabs.query({ active: true }, function (payload) {
	                    chrome.tabs.duplicate(payload[0].id);
	                });
	                break;
	            }
	            case Message.ZOOM: {
	                chrome.tabs.query({ active: true }, function (payload) {
	                    chrome.tabs.getZoom(payload[0].id, function (zoomFactor) {
	                        switch (message.zoomType) {
	                            case 0 /* IN */: {
	                                chrome.tabs.setZoom(payload[0].id, zoomFactor + 0.2);
	                                break;
	                            }
	                            case 1 /* OUT */: {
	                                chrome.tabs.setZoom(payload[0].id, zoomFactor - 0.2);
	                                break;
	                            }
	                            case 2 /* RESET */: {
	                                chrome.tabs.setZoom(payload[0].id, 1);
	                                break;
	                            }
	                            default: {
	                                console.log('unknown zoom modifier EZoomType');
	                            }
	                        }
	                    });
	                });
	                break;
	            }
	            case Message.CAPTURE: {
	                break;
	            }
	            case Message.GET_FAVORITES: {
	                chrome.topSites.get(function (favorites) {
	                    chrome.runtime.sendMessage({ type: Message.GET_FAVORITES, favorites: favorites });
	                });
	                break;
	            }
	            default: {
	                console.log('undefined message: ');
	                console.log(message);
	            }
	        }
	    });
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BookmarkAdd_1 = __webpack_require__(4);
	exports.BOOKMARK_ADD = BookmarkAdd_1.BOOKMARK_ADD;
	var BookmarkAddAs_1 = __webpack_require__(5);
	exports.BOOKMARK_ADD_AS = BookmarkAddAs_1.BOOKMARK_ADD_AS;
	var TabClose_1 = __webpack_require__(6);
	exports.TAB_CLOSE = TabClose_1.TAB_CLOSE;
	var TabNew_1 = __webpack_require__(7);
	exports.TAB_NEW = TabNew_1.TAB_NEW;
	var Zoom_1 = __webpack_require__(8);
	exports.ZOOM = Zoom_1.ZOOM;
	var Capture_1 = __webpack_require__(9);
	exports.CAPTURE = Capture_1.CAPTURE;
	var TabReload_1 = __webpack_require__(10);
	exports.TAB_RELOAD = TabReload_1.TAB_RELOAD;
	var TabDuplicate_1 = __webpack_require__(11);
	exports.TAB_DUPLICATE = TabDuplicate_1.TAB_DUPLICATE;
	var GetFavorites_1 = __webpack_require__(12);
	exports.GET_FAVORITES = GetFavorites_1.GET_FAVORITES;
	var ShowFavorites_1 = __webpack_require__(13);
	exports.SHOW_FAVORITES = ShowFavorites_1.SHOW_FAVORITES;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.BOOKMARK_ADD = 'BOOKMARK_ADD';
	/**
	 * Add current page to bookmarks
	 */
	exports.bookmarkAdd = function () { return ({
	    type: exports.BOOKMARK_ADD
	}); };


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	exports.BOOKMARK_ADD_AS = 'BOOKMARK_ADD_AS';
	exports.bookmarkAddAs = function (bookmarkTitle) { return ({
	    type: exports.BOOKMARK_ADD_AS,
	    title: bookmarkTitle
	}); };


/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	"use strict";
	exports.ZOOM = 'ZOOM';
	;
	/**
	 * Add current page to bookmarks
	 */
	exports.zoom = function (zoomType) { return ({
	    type: exports.ZOOM,
	    zoomType: zoomType
	}); };


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	exports.CAPTURE = 'CAPTURE';
	exports.capture = function (captureType) { return ({
	    type: exports.CAPTURE,
	    captureType: captureType
	}); };


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	exports.TAB_RELOAD = 'TAB_RELOAD';
	;
	/**
	 * Close current page
	 */
	exports.tabReload = function () { return ({
	    type: exports.TAB_RELOAD
	}); };


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	exports.TAB_DUPLICATE = 'TAB_DUPLICATE';
	;
	/**
	 * Close current page
	 */
	exports.tabDuplicate = function () { return ({
	    type: exports.TAB_DUPLICATE,
	}); };


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	exports.GET_FAVORITES = 'GET_FAVORITES';
	exports.getFavorites = function () { return ({
	    type: exports.GET_FAVORITES
	}); };


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	exports.SHOW_FAVORITES = 'SHOW_FAVORITES';
	exports.showFavorites = function (favorites) { return ({
	    type: exports.SHOW_FAVORITES,
	    favorites: favorites
	}); };


/***/ }
/******/ ]);