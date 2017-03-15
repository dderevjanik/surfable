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
	const MessageReceiver_1 = __webpack_require__(2);
	const EventListener_1 = __webpack_require__(35);
	const Synchronize_1 = __webpack_require__(36);
	EventListener_1.eventListener();
	MessageReceiver_1.messageReceiver();
	Synchronize_1.synchronizeChromeState();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const Messages_1 = __webpack_require__(3);
	const Sender_1 = __webpack_require__(4);
	const Constants_1 = __webpack_require__(6);
	const ChromeWrapper_1 = __webpack_require__(7);
	const Store_1 = __webpack_require__(8);
	/*
	 * Will listen on events/messages incoming from other parts of extension
	 */
	exports.messageReceiver = () => {
	    chrome.runtime.onMessage.addListener(function (message) {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (message.target === 0 /* BACKGROUND */) {
	                console.debug(`Message '${message.type}' received`);
	                switch (message.type) {
	                    case Messages_1.MESSAGE.TAB_CLOSE: {
	                        const activeTab = yield ChromeWrapper_1.getActiveTab();
	                        chrome.tabs.remove(activeTab.id);
	                        break;
	                    }
	                    case Messages_1.MESSAGE.TAB_NEW: {
	                        if (message.url.length > 0) {
	                            chrome.tabs.create({ url: message.url });
	                        }
	                        else {
	                            // If url isn't specified, open an empty tab
	                            chrome.tabs.create({});
	                        }
	                        break;
	                    }
	                    case Messages_1.MESSAGE.BOOKMARK_ADD: {
	                        const activeTab = yield ChromeWrapper_1.getActiveTab();
	                        chrome.bookmarks.create({ title: activeTab.title, url: activeTab.url });
	                        break;
	                    }
	                    case Messages_1.MESSAGE.TAB_RELOAD: {
	                        const activeTab = yield ChromeWrapper_1.getActiveTab();
	                        chrome.tabs.reload(activeTab.id);
	                        break;
	                    }
	                    case Messages_1.MESSAGE.TAB_DUPLICATE: {
	                        const activeTab = yield ChromeWrapper_1.getActiveTab();
	                        chrome.tabs.duplicate(activeTab.id);
	                        break;
	                    }
	                    case Messages_1.MESSAGE.ZOOM: {
	                        const activeTab = yield ChromeWrapper_1.getActiveTab();
	                        const zoomFactor = yield ChromeWrapper_1.getTabZoomFactor(activeTab.id);
	                        switch (message.zoomType) {
	                            case 0 /* IN */: {
	                                chrome.tabs.setZoom(activeTab.id, zoomFactor + Constants_1.ZOOM_MULTIPLIER);
	                                break;
	                            }
	                            case 1 /* OUT */: {
	                                chrome.tabs.setZoom(activeTab.id, zoomFactor - Constants_1.ZOOM_MULTIPLIER);
	                                break;
	                            }
	                            case 2 /* RESET */: {
	                                chrome.tabs.setZoom(activeTab.id, 1);
	                                break;
	                            }
	                            default: {
	                                throw new Error('Unknown EZoomType: ' + message.zoomType);
	                            }
	                        }
	                        break;
	                    }
	                    case Messages_1.MESSAGE.CAPTURE: {
	                        break;
	                    }
	                    case Messages_1.MESSAGE.PRINT_PAGE: {
	                        const activeTab = yield ChromeWrapper_1.getActiveTab();
	                        chrome.tabs.update(activeTab.id, { url: Constants_1.JAVASCRIPT_PRINT_PAGE });
	                        break;
	                    }
	                    case Messages_1.MESSAGE.SYNC_CHROME_REQUEST: {
	                        console.log(Store_1.store.getState().chromeState);
	                        Sender_1.sendToPopup({ type: Messages_1.MESSAGE.SYNC_CHROME_STATE, chromeState: Store_1.store.getState().chromeState });
	                        break;
	                    }
	                    case Messages_1.MESSAGE.TAB_SWITCH: {
	                        chrome.tabs.update(message.id, { active: true });
	                        break;
	                    }
	                    case Messages_1.MESSAGE.TAB_CLOSE_ALL: {
	                        const tabs = yield ChromeWrapper_1.getCurrentWindowTabs();
	                        // First open a new tab to avoid closing chrome's window
	                        chrome.tabs.create({});
	                        tabs.forEach(tab => chrome.tabs.remove(tab.id));
	                        break;
	                    }
	                    case Messages_1.MESSAGE.WINDOW_CLOSE: {
	                        const currentWindow = yield ChromeWrapper_1.getCurrentWindow();
	                        chrome.windows.remove(currentWindow.id);
	                        break;
	                    }
	                    default: {
	                        throw new Error(`Unknown message type: ${message.type}`);
	                    }
	                }
	            }
	            else {
	            }
	        });
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
	    TAB_HISTORY: 'TAB_HISTORY',
	    PRINT_PAGE: 'PRINT_PAGE',
	    WINDOW_CLOSE: 'WINDOW_CLOSE',
	    BOOKMARK_ADD: 'BOOKMARKD_ADD',
	    ZOOM: 'ZOOM',
	    CAPTURE: 'CAPTURE',
	    SHOW_FAVORITES: 'SHOW_FAVORITES',
	    GET_FAVORITES: 'GET_FAVORITES',
	    SYNC_CHROME_STATE: 'SYNC_CHROME_STATE',
	    SYNC_CHROME_REQUEST: 'SYNC_CHROME_REQUEST',
	    SHOW_TOAST: 'SHOW_TOAST',
	    SEARCH_CHANGE: 'SEARCH_CHANGE'
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	const sendMessage = (message) => {
	    if (process.env.dev) {
	        console.log(`Message '${message.type}' sent`);
	    }
	    chrome.runtime.sendMessage(message);
	};
	/**
	 * Send specific message to Background
	 */
	exports.sendToBackground = (message) => sendMessage(__assign({}, message, { target: 0 /* BACKGROUND */ }));
	/**
	 * Send specific message to Popup
	 */
	exports.sendToPopup = (message) => sendMessage(__assign({}, message, { target: 2 /* POPUP */ }));
	/**
	 * Send specific message to Content
	 */
	exports.sendToContent = (message) => sendMessage(__assign({}, message, { target: 1 /* CONTENT */ }));
	/**
	 * Dispatch message between Background, Popup and Content
	 */
	exports.sendAction = (message) => {
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
	            throw new Error(`Unexpected target '${message.target}' for message's type '${message.type}'`);
	        }
	    }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	exports.MAX_RECENT_TABS = 10;
	exports.MAX_TEXT_LENGTH = 90; // @TODO refactor, if command doesn't have icon, it should be longer
	exports.MAX_TEXT_LENGTH_ICON = 90;
	exports.ZOOM_MULTIPLIER = 0.2;
	exports.JAVASCRIPT_PRINT_PAGE = 'javascript:window.print();';


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	// @TODO: add reject
	// @TODO: try to solve all Promises with abstract wrapper
	function getCurrentWindow() {
	    return new Promise(resolve => {
	        chrome.windows.getCurrent(window => {
	            resolve(window);
	        });
	    });
	}
	exports.getCurrentWindow = getCurrentWindow;
	;
	function getCurrentWindowTabs() {
	    return new Promise(resolve => {
	        chrome.tabs.query({ currentWindow: true }, tabs => {
	            resolve(tabs);
	        });
	    });
	}
	exports.getCurrentWindowTabs = getCurrentWindowTabs;
	function getActiveTab() {
	    return new Promise(resolve => {
	        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
	            if (tabs.length === 0) {
	                throw new Error('no active tab in current window');
	            }
	            if (tabs.length > 1) {
	                throw new Error('cannot have more than one active tab per window');
	            }
	            resolve(tabs[0]);
	        });
	    });
	}
	exports.getActiveTab = getActiveTab;
	function getTabZoomFactor(tabId) {
	    return new Promise(resolve => {
	        chrome.tabs.getZoom(tabId, zoomFactor => {
	            resolve(zoomFactor);
	        });
	    });
	}
	exports.getTabZoomFactor = getTabZoomFactor;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const redux_1 = __webpack_require__(9);
	const AppReducer_1 = __webpack_require__(30);
	const AppState_1 = __webpack_require__(31);
	exports.store = redux_1.createStore(AppReducer_1.appReducer, AppState_1.initState);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(10);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(25);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(27);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(28);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(29);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(26);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;

	var _isPlainObject = __webpack_require__(11);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(21);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(12),
	    getPrototype = __webpack_require__(18),
	    isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13),
	    getRawTag = __webpack_require__(16),
	    objectToString = __webpack_require__(17);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(14);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(15);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(19);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(24);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(23)(module)))

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	var _createStore = __webpack_require__(10);

	var _isPlainObject = __webpack_require__(11);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(26);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });

	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];

	    if (process.env.NODE_ENV !== 'production') {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }

	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  if (process.env.NODE_ENV !== 'production') {
	    var unexpectedKeyCache = {};
	  }

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	var _compose = __webpack_require__(29);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  var last = funcs[funcs.length - 1];
	  var rest = funcs.slice(0, -1);
	  return function () {
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	const AppState_1 = __webpack_require__(31);
	const Actions_1 = __webpack_require__(33);
	const Immutable_1 = __webpack_require__(34);
	const Constants_1 = __webpack_require__(6);
	exports.appReducer = (state = AppState_1.initState, action) => {
	    switch (action.type) {
	        case Actions_1.ACTION.TAB_CREATED: {
	            const tabHistory = { id: action.tab.id, history: [action.tab] };
	            return __assign({}, state, { chromeState: __assign({}, state.chromeState, { openedTabs: Immutable_1.addItem(state.chromeState.openedTabs, tabHistory) }) });
	        }
	        case Actions_1.ACTION.TAB_UPDATED: {
	            const tabIndex = state.chromeState.openedTabs.map(t => t.id).indexOf(action.tabId);
	            if (tabIndex === -1) {
	                throw new Error(`Cannot update a tab width id '${action.tabId}', which doesn't exist`);
	            }
	            if (state.chromeState.openedTabs[tabIndex].history[0].url === action.tab.url) {
	                // Url doesn't changed, don't add anything to history then
	                return state;
	            }
	            const tabHistory = state.chromeState.openedTabs[tabIndex];
	            const updatedHistory = {
	                id: tabHistory.id,
	                history: Immutable_1.addToStack(tabHistory.history, action.tab, 10)
	            };
	            return __assign({}, state, { chromeState: __assign({}, state.chromeState, { openedTabs: Immutable_1.updateItem(state.chromeState.openedTabs, updatedHistory, tabIndex) }) });
	        }
	        case Actions_1.ACTION.TAB_REMOVED: {
	            const tabIndex = state.chromeState.openedTabs.map(t => t.id).indexOf(action.tabId);
	            if (tabIndex === -1) {
	                throw new Error(`Cannot remove a tab width id '${action.tabId}', which doesn't exist`);
	            }
	            return __assign({}, state, { chromeState: __assign({}, state.chromeState, { openedTabs: Immutable_1.removeItem(state.chromeState.openedTabs, tabIndex), closedTabs: Immutable_1.addToStack(state.chromeState.closedTabs, state.chromeState.openedTabs[tabIndex].history[0], Constants_1.MAX_RECENT_TABS) }) });
	        }
	        case Actions_1.ACTION.TAB_ACTIVE_CHANGED: {
	            return __assign({}, state, { chromeState: __assign({}, state.chromeState, { currentActiveTabId: action.activeTabId }) });
	        }
	        case Actions_1.ACTION.BOOKMARKS_UPDATED: {
	            // TODO: Add bookmarks handler
	            return __assign({}, state);
	        }
	        default: {
	            return state;
	        }
	    }
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Bookmarks_1 = __webpack_require__(32);
	exports.initState = {
	    chromeState: {
	        currentActiveTabId: -1,
	        currentActiveWindowId: -1,
	        openedTabs: [],
	        closedTabs: [],
	        favorites: [],
	        bookmarks: [],
	        recentUrls: []
	    }
	};
	// Fill store on start of the App
	chrome.tabs.query({ currentWindow: true }, tabs => {
	    exports.initState.chromeState.openedTabs = tabs.map(t => ({ id: t.id, history: [t] }));
	});
	chrome.tabs.query({ currentWindow: true, active: true }, tab => {
	    exports.initState.chromeState.currentActiveTabId = tab[0].id;
	});
	chrome.topSites.get(mostVisited => {
	    exports.initState.chromeState.favorites = mostVisited;
	});
	chrome.bookmarks.getTree(bookmarkTree => {
	    const bookmarks = Bookmarks_1.getBookmarks(bookmarkTree);
	    exports.initState.chromeState.bookmarks = bookmarks;
	});


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	// @TODO reduce can lead to performance issues here, maybe muttability will help to boost performance
	const extractBookmarks = (bookmarkNode) => bookmarkNode.children.reduce((acc, node) => node.url ? [...acc, node] : acc.concat(extractBookmarks(node)), []);
	/**
	 * Get array of all bookmarks available
	 * @TODO remove duplicates
	 */
	exports.getBookmarks = (bookmarkTree) => bookmarkTree.reduce((acc, node) => node.url ? [...acc, node] : acc.concat(extractBookmarks(node)), []);


/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	exports.ACTION = {
	    TAB_CREATED: 'TAB_CREATED',
	    TAB_REMOVED: 'TAB_REMOVED',
	    TAB_UPDATED: 'TAB_UPDATED',
	    BOOKMARKS_UPDATED: 'BOOKMARKS_UPDATED',
	    TAB_ACTIVE_CHANGED: 'TAB_ACTIVE_CHANGED'
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Add item to limited stack
	 */
	exports.addToStack = (stack, item, stackSize) => (stack.length > stackSize)
	    ? [...stack.slice(1, stack.length), item]
	    : [item, ...stack];
	/**
	 * Check if array includes item
	 */
	exports.includes = (array, item) => (array.indexOf(item) > -1);
	/**
	 * Add new item to array
	 */
	exports.addItem = (array, item) => [...array, item];
	/**
	 * Remove item from specific index
	 */
	exports.removeItem = (array, index) => {
	    if (index >= array.length) {
	        throw new Error(`Index '${index}' is longer than array's length '${array.length}'`);
	    }
	    return [
	        ...array.slice(0, index),
	        ...array.slice(index + 1, array.length)
	    ];
	};
	/**
	 * Update item on specific index
	 */
	exports.updateItem = (array, item, index) => {
	    if (index >= array.length) {
	        throw new Error(`Index '${index}' is longer than array's length ${array.length}`);
	    }
	    return [
	        ...array.slice(0, index),
	        item,
	        ...array.slice(index + 1, array.length)
	    ];
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Store_1 = __webpack_require__(8);
	const Actions_1 = __webpack_require__(33);
	/**
	 * Will listen on events incoming from chrome
	 */
	exports.eventListener = () => {
	    chrome.tabs.onActivated.addListener(activeTabInfo => {
	        Store_1.store.dispatch({ type: Actions_1.ACTION.TAB_ACTIVE_CHANGED, activeTabId: activeTabInfo.tabId });
	    });
	    chrome.tabs.onCreated.addListener((tab) => {
	        Store_1.store.dispatch({ type: Actions_1.ACTION.TAB_CREATED, tab: tab });
	    });
	    chrome.tabs.onRemoved.addListener((tabId) => {
	        Store_1.store.dispatch({ type: Actions_1.ACTION.TAB_REMOVED, tabId: tabId });
	    });
	    chrome.tabs.onUpdated.addListener((tabId, _info, tab) => {
	        Store_1.store.dispatch({ type: Actions_1.ACTION.TAB_UPDATED, tabId: tabId, tab: tab });
	    });
	    chrome.bookmarks.onCreated.addListener(() => {
	        Store_1.store.dispatch({ type: Actions_1.ACTION.BOOKMARKS_UPDATED });
	    });
	    chrome.bookmarks.onChanged.addListener(() => {
	        Store_1.store.dispatch({ type: Actions_1.ACTION.BOOKMARKS_UPDATED });
	    });
	    chrome.bookmarks.onRemoved.addListener(() => {
	        Store_1.store.dispatch({ type: Actions_1.ACTION.BOOKMARKS_UPDATED });
	    });
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Store_1 = __webpack_require__(8);
	const Messages_1 = __webpack_require__(3);
	const Sender_1 = __webpack_require__(4);
	/**
	 * On every store change, it'll synchronize it with other parts
	 */
	exports.synchronizeChromeState = () => {
	    Store_1.store.subscribe(() => {
	        Sender_1.sendToPopup({ type: Messages_1.MESSAGE.SYNC_CHROME_REQUEST, chromeState: Store_1.store.getState().chromeState });
	    });
	};


/***/ }
/******/ ]);