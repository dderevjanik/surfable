import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { MessageType, MESSAGE } from 'surfable-common/src/Messages';
import { sendToPopup, sendToContent } from 'surfable-common/src/Sender';
import { store } from './redux/Store';

/**
 * Will listen on events/messages incoming from other parts of extension
 */
export const messageReceiver = () => {
	chrome.runtime.onMessage.addListener((message: MessageType) => {
		if (message.target === ETarget.BACKGROUND) {
			console.debug(`Message '${message.type}' received`);
			switch(message.type) {
				case MESSAGE.TAB_CLOSE: {
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.remove(payload[0].id);
					});
					break;
				}
				case MESSAGE.TAB_NEW: {
					if (message.url.length > 0) {
						chrome.tabs.create({url: message.url});
					} else {
						chrome.tabs.create({});
					}
					break;
				}
				case MESSAGE.BOOKMARK_ADD : {
					chrome.tabs.query({active: true}, payload => {
						const activeTab = payload[0];
						chrome.bookmarks.create({title: activeTab.title, url: activeTab.url});
					});

					break;
				}
				case MESSAGE.TAB_RELOAD: {
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.reload(payload[0].id);
					});
					break;
				}
				case MESSAGE.TAB_DUPLICATE: {
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.duplicate(payload[0].id);
					});
					break;
				}
				case MESSAGE.ZOOM: {
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.getZoom(payload[0].id, zoomFactor => {
							switch(message.zoomType) {
								case EZoomType.IN: {
									chrome.tabs.setZoom(payload[0].id, zoomFactor + 0.2);
									break;
								}
								case EZoomType.OUT: {
									chrome.tabs.setZoom(payload[0].id, zoomFactor - 0.2);
									break;
								}
								case EZoomType.RESET: {
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
				case MESSAGE.CAPTURE: {
					break;
				}
				case MESSAGE.PRINT_PAGE: {
					const actionUrl = 'javascript:window.print();';
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.update(payload[0].id, {url: actionUrl});
					});
					break;
				}
				case MESSAGE.SYNC_TABS_REQUEST: {
					sendToPopup({type: MESSAGE.SYNC_TABS, tabs: store.getState()});
					break;
				}
				case MESSAGE.TAB_SWITCH: {
					chrome.tabs.update(message.id, {active: true});
					break;
				}
				case MESSAGE.TAB_CLOSE_ALL: {
					chrome.tabs.query({currentWindow: true}, payload => {
						// First open a new tab to avoid closing chrome
						chrome.tabs.create({});
						payload.forEach(tab => chrome.tabs.remove(tab.id));
					});
				}
				case MESSAGE.WINDOW_CLOSE: {
					chrome.windows.getCurrent(window => {
						chrome.windows.remove(window.id);
					});
					break;
				}
				case MESSAGE.BOOKMARK_ADD: {
					chrome.tabs.query({active: true}, payload => {
						const activeTab = payload[0];
						chrome.bookmarks.create({title: activeTab.title, url: activeTab.url});
						chrome.tabs.sendMessage(activeTab.id, {type: MESSAGE.SHOW_TOAST, title: 'dsadas', text: 'sdadsa', level: 0});
					});
				}
				default: {
					throw new Error(`Unknown message type: ${message.type}`);
				}
			}
		} else {
			// Do nothing, message isn't adressed for 'Background'
		}
	});
};
