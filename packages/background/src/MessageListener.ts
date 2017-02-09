import * as Message from 'surfable-common/src/actions/All';
import {EZoomType} from 'surfable-common/src/enums/EZoomType';

export const messageListener = () => {
	chrome.runtime.onMessage.addListener((message: Message.Type, sender) => {
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
					switch(message.zoomType) {
						case EZoomType.IN: {
							chrome.tabs.setZoom(payload[0].id, 1.2);
							break;
						}
						case EZoomType.OUT: {
							chrome.tabs.setZoom(payload[0].id, 0.8);
							break;
						}
						case EZoomType.RESET: {
							chrome.tabs.setZoom(payload[0].id, 1);
							break;
						}
						default: {
							console.log('unknown zoom modifier EZoomType');
						}
					}
				});
				break;
			}
			case Message.CAPTURE: {
				break;
			}
			case Message.GET_FAVORITES: {
				chrome.topSites.get(favorites => {
					chrome.runtime.sendMessage({type: Message.GET_FAVORITES, favorites: favorites});
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
