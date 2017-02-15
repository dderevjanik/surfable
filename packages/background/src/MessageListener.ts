import { sendToContent } from '../../common/src/Sender';
import { MessageType, MESSAGE } from 'surfable-common/src/Messages';
import {EZoomType} from 'surfable-common/src/enums/EZoomType';
import {ETarget} from 'surfable-common/src/enums/ETarget';

export const messageListener = () => {

	chrome.runtime.onMessage.addListener((message: MessageType) => {
		if (message.target === ETarget.BACKGROUND) {
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
				case MESSAGE.GET_FAVORITES: {
					chrome.topSites.get(favorites => {
						chrome.runtime.sendMessage({type: MESSAGE.SHOW_FAVORITES, favorites: favorites});
					});
					break;
				}
				case MESSAGE.GET_CURRENT_TABS: {
					chrome.tabs.query({currentWindow: true}, payload => {
						sendToContent({type: MESSAGE.SHOW_TABS, tabs: payload});
					});
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
					});
				}
				default: {
					throw new Error('Unknown message type: ' + message.type);
				}
			}
		} else {
			// Do nothing
		}
	});
};
