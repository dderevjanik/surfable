import { SWITCH_TAB } from '../../common/src/actions/All';
import { sendToContent } from '../../common/src/Sender';
import * as Message from 'surfable-common/src/actions/All';
import {EZoomType} from 'surfable-common/src/enums/EZoomType';
import {ETarget} from 'surfable-common/src/enums/ETarget';

export const messageListener = () => {
	chrome.runtime.onMessage.addListener((message: Message.Type, sender) => {
		if (message.target === ETarget.BACKGROUND) {
			switch(message.type) {
				case Message.TAB_CLOSE: {
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.remove(payload[0].id);
					});
					break;
				}
				case Message.TAB_NEW: {
					if (message.url.length > 0) {
						chrome.tabs.create({url: message.url});
					} else {
						chrome.tabs.create({});
					}
					break;
				}
				case Message.BOOKMARK_ADD : {
					chrome.tabs.query({active: true}, payload => {
						const activeTab = payload[0];
						chrome.bookmarks.create({title: activeTab.title, url: activeTab.url});
					});

					break;
				}
				case Message.BOOKMARK_ADD_AS : {
					chrome.bookmarks.create({title: message.title, url: sender.url});
					break;
				}
				case Message.TAB_RELOAD: {
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.reload(payload[0].id);
					});
					break;
				}
				case Message.TAB_DUPLICATE: {
					chrome.tabs.query({active: true}, payload => {
						chrome.tabs.duplicate(payload[0].id);
					});
					break;
				}
				case Message.ZOOM: {
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
				case Message.CAPTURE: {
					break;
				}
				case Message.PRINT_PAGE: {
					const actionUrl = 'javascript:window.print();';
					chrome.tabs.query({active: true}, payload => {
						console.log(payload);
  						chrome.tabs.update(payload[0].id, {url: actionUrl});
					});
					break;
				}
				case Message.GET_FAVORITES: {
					chrome.topSites.get(favorites => {
						chrome.runtime.sendMessage({type: Message.SHOW_FAVORITES, favorites: favorites});
					});
					break;
				}
				case Message.GET_CURRENT_TABS: {
					chrome.tabs.query({currentWindow: true}, payload => {
						sendToContent({type: Message.SHOW_TABS, tabs: payload});
					});
					break;
				}
				case Message.TAB_SWITCH: {
					chrome.tabs.update(message.id, {active: true});
					break;
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
