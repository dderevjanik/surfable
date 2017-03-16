import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { MessageType, MESSAGE } from 'surfable-common/src/Messages';
import { sendToPopup, sendToContent } from 'surfable-common/src/Sender';
import { JAVASCRIPT_PRINT_PAGE, ZOOM_MULTIPLIER } from './data/Constants';
import { getActiveTab, getTabZoomFactor, getCurrentWindowTabs, getCurrentWindow } from './ChromeWrapper';
import { store } from './redux/Store';

/*
 * Will listen on events/messages incoming from other parts of extension
 */
export const messageReceiver = (): void => {
	chrome.runtime.onMessage.addListener(async function (message: MessageType) {
		if (message.target === ETarget.BACKGROUND) {
			console.debug(`Message '${message.type}' received`);
			switch (message.type) {
				case MESSAGE.TAB_CLOSE: {
					const activeTab = await getActiveTab();
					chrome.tabs.remove(activeTab.id);
					break;
				}
				case MESSAGE.TAB_NEW: {
					if (message.url.length > 0) {
						chrome.tabs.create({ url: message.url });
					} else {
						// If url isn't specified, open an empty tab
						chrome.tabs.create({});
					}
					break;
				}
				case MESSAGE.TAB_CHANGE_URL: {
					const activeTab = await getActiveTab();
					chrome.tabs.update(activeTab.id, {
						url: message.newUrl
					});
				}
				case MESSAGE.BOOKMARK_ADD: {
					const activeTab = await getActiveTab();
					chrome.bookmarks.create({ title: activeTab.title, url: activeTab.url });
					break;
				}
				case MESSAGE.TAB_RELOAD: {
					const activeTab = await getActiveTab();
					chrome.tabs.reload(activeTab.id);
					break;
				}
				case MESSAGE.TAB_DUPLICATE: {
					const activeTab = await getActiveTab();
					chrome.tabs.duplicate(activeTab.id);
					break;
				}
				case MESSAGE.ZOOM: {
					const activeTab = await getActiveTab();
					const zoomFactor = await getTabZoomFactor(activeTab.id);
					switch (message.zoomType) {
						case EZoomType.IN: {
							chrome.tabs.setZoom(activeTab.id, zoomFactor + ZOOM_MULTIPLIER);
							break;
						}
						case EZoomType.OUT: {
							chrome.tabs.setZoom(activeTab.id, zoomFactor - ZOOM_MULTIPLIER);
							break;
						}
						case EZoomType.RESET: {
							chrome.tabs.setZoom(activeTab.id, 1);
							break;
						}
						default: {
							throw new Error('Unknown EZoomType: ' + message.zoomType);
						}
					}
					break;
				}
				case MESSAGE.CAPTURE: {
					break;
				}
				case MESSAGE.PRINT_PAGE: {
					const activeTab = await getActiveTab();
					chrome.tabs.update(activeTab.id, { url: JAVASCRIPT_PRINT_PAGE });
					break;
				}
				case MESSAGE.SYNC_CHROME_REQUEST: {
					console.log(store.getState().chromeState);
					sendToPopup({ type: MESSAGE.SYNC_CHROME_STATE, chromeState: store.getState().chromeState });
					break;
				}
				case MESSAGE.TAB_SWITCH: {
					chrome.tabs.update(message.id, { active: true });
					break;
				}
				case MESSAGE.TAB_CLOSE_ALL: {
					const tabs = await getCurrentWindowTabs();
					// First open a new tab to avoid closing chrome's window
					chrome.tabs.create({});
					tabs.forEach(tab => chrome.tabs.remove(tab.id));
					break;
				}
				case MESSAGE.WINDOW_CLOSE: {
					const currentWindow = await getCurrentWindow();
					chrome.windows.remove(currentWindow.id);
					break;
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
