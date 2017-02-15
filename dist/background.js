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
	var Sender_1 = __webpack_require__(3);
	var Messages_1 = __webpack_require__(4);
	exports.messageListener = function () {
	    chrome.runtime.onMessage.addListener(function (message) {
	        if (message.target === 0 /* BACKGROUND */) {
	            switch (message.type) {
	                case Messages_1.MESSAGE.TAB_CLOSE: {
	                    chrome.tabs.query({ active: true }, function (payload) {
	                        chrome.tabs.remove(payload[0].id);
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.TAB_NEW: {
	                    if (message.url.length > 0) {
	                        chrome.tabs.create({ url: message.url });
	                    }
	                    else {
	                        chrome.tabs.create({});
	                    }
	                    break;
	                }
	                case Messages_1.MESSAGE.BOOKMARK_ADD: {
	                    chrome.tabs.query({ active: true }, function (payload) {
	                        var activeTab = payload[0];
	                        chrome.bookmarks.create({ title: activeTab.title, url: activeTab.url });
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.TAB_RELOAD: {
	                    chrome.tabs.query({ active: true }, function (payload) {
	                        chrome.tabs.reload(payload[0].id);
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.TAB_DUPLICATE: {
	                    chrome.tabs.query({ active: true }, function (payload) {
	                        chrome.tabs.duplicate(payload[0].id);
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.ZOOM: {
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
	                                    throw new Error('unknown EZoomType: ' + message.zoomType);
	                                }
	                            }
	                        });
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.CAPTURE: {
	                    break;
	                }
	                case Messages_1.MESSAGE.PRINT_PAGE: {
	                    var actionUrl_1 = 'javascript:window.print();';
	                    chrome.tabs.query({ active: true }, function (payload) {
	                        chrome.tabs.update(payload[0].id, { url: actionUrl_1 });
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.GET_FAVORITES: {
	                    chrome.topSites.get(function (favorites) {
	                        chrome.runtime.sendMessage({ type: Messages_1.MESSAGE.SHOW_FAVORITES, favorites: favorites });
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.GET_CURRENT_TABS: {
	                    chrome.tabs.query({ currentWindow: true }, function (payload) {
	                        Sender_1.sendToContent({ type: Messages_1.MESSAGE.SHOW_TABS, tabs: payload });
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.TAB_SWITCH: {
	                    chrome.tabs.update(message.id, { active: true });
	                    break;
	                }
	                case Messages_1.MESSAGE.TAB_CLOSE_ALL: {
	                    chrome.tabs.query({ currentWindow: true }, function (payload) {
	                        // First open a new tab to avoid closing chrome
	                        chrome.tabs.create({});
	                        payload.forEach(function (tab) { return chrome.tabs.remove(tab.id); });
	                    });
	                }
	                case Messages_1.MESSAGE.WINDOW_CLOSE: {
	                    chrome.windows.getCurrent(function (window) {
	                        chrome.windows.remove(window.id);
	                    });
	                    break;
	                }
	                case Messages_1.MESSAGE.BOOKMARK_ADD: {
	                    chrome.tabs.query({ active: true }, function (payload) {
	                        var activeTab = payload[0];
	                        chrome.bookmarks.create({ title: activeTab.title, url: activeTab.url });
	                    });
	                }
	                default: {
	                    throw new Error('Unknown message type: ' + message.type);
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
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	var sendMessage = function (message) { return chrome.runtime.sendMessage(message); };
	/**
	 * Send specific message to Background
	 */
	exports.sendToBackground = function (message) {
	    return sendMessage(__assign({}, message, { target: 0 /* BACKGROUND */ }));
	};
	/**
	 * Send specific message to Popup
	 */
	exports.sendToPopup = function (message) {
	    return sendMessage(__assign({}, message, { target: 2 /* POPUP */ }));
	};
	/**
	 * Send specific message to Content
	 */
	exports.sendToContent = function (message) {
	    return sendMessage(__assign({}, message, { target: 1 /* CONTENT */ }));
	};
	/**
	 * Dispatch message between Background, Popup and Content
	 */
	exports.sendAction = function (message) {
	    switch (message.target) {
	        case 0 /* BACKGROUND */: {
	            sendMessage(message);
	            break;
	        }
	        case 1 /* CONTENT */: {
	            sendMessage(message);
	            break;
	        }
	        case 2 /* POPUP */: {
	            sendMessage(message);
	            break;
	        }
	        default: {
	            throw new Error("Unexpected target '" + message.target + "' for message '" + message.type + "'");
	        }
	    }
	};


/***/ },
/* 4 */
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
	    SHOW_TABS: 'SHOW_TABS',
	    GET_FAVORITES: 'GET_FAVORITES',
	    GET_CURRENT_TABS: 'GET_CURRENT_TABS'
	};


/***/ }
/******/ ]);