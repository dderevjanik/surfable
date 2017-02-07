import { IChrome } from './interfaces/IChrome';
import { Type, ZOOM, TAB_DUPLICATE, TAB_RELOAD, TAB_CLOSE, TAB_NEW, BOOKMARK_ADD, BOOKMARK_ADD_AS, CAPTURE } from 'surfable-common/src/actions/All';
import { EZoomType } from 'surfable-common/src/enums/EZoomType';

declare const chrome: IChrome;

chrome.runtime.onMessage.addListener((message: Type, sender) => {
	switch(message.type) {
		case TAB_CLOSE: {
			chrome.tabs.query({active: true}, (payload) => {
				chrome.tabs.remove(payload[0].id);
			});
			break;
		}
		case TAB_NEW: {
			if (message.url.length > 0) {
				chrome.tabs.create({ url: message.url });
			} else {
				chrome.tabs.create({});
			}
			break;
		}
		case BOOKMARK_ADD : {
			chrome.tabs.query({active: true}, (payload) => {
				const activeTab = payload[0];
				chrome.bookmarks.create({title: activeTab.title, url: activeTab.url});
			});

			break;
		}
		case BOOKMARK_ADD_AS : {
			chrome.bookmarks.create({title: message.title, url: sender.url});
			break;
		}
		case TAB_RELOAD: {
			chrome.tabs.query({active: true}, (payload) => {
				chrome.tabs.reload(payload[0].id);
			});
			break;
		}
		case TAB_DUPLICATE: {
			chrome.tabs.query({active: true}, (payload) => {
				chrome.tabs.duplicate(payload[0].id);
			});
			break;
		}
		case ZOOM: {
			chrome.tabs.query({active: true}, (payload) => {
				switch(message.zoomType) {
					case EZoomType.IN: {
						chrome.tabs.setZoom(payload[0].id, 1.2);
					}
					case EZoomType.OUT: {
						chrome.tabs.setZoom(payload[0].id, 0.8);
					}
					case EZoomType.RESET: {
						chrome.tabs.setZoom(payload[0].id, 1.0);
					}
				}
				chrome.tabs.setZoom(payload[0].id, 1.2);
			});
			break;
		}
		case CAPTURE: {
			break;
		}
		default: {
			console.log('undefined message type: ' + message);
		}
	}
});
