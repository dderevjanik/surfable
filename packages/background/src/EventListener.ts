import { store } from './redux/Store';
import { ACTION } from './redux/Actions';

/**
 * Will listen on events incoming from chrome
 */
export const eventListener = (): void => {
	chrome.tabs.onActivated.addListener(activeTabInfo => {
		store.dispatch({ type: ACTION.TAB_ACTIVE_CHANGED, activeTabId: activeTabInfo.tabId });
	});
	chrome.tabs.onCreated.addListener((tab: chrome.tabs.Tab) => {
		store.dispatch({ type: ACTION.TAB_CREATED, tab: tab });
	});
	chrome.tabs.onRemoved.addListener((tabId: number) => {
		store.dispatch({ type: ACTION.TAB_REMOVED, tabId: tabId });
	});
	chrome.tabs.onUpdated.addListener((tabId: number, _info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
		store.dispatch({ type: ACTION.TAB_UPDATED, tabId: tabId, tab: tab });
	});
	chrome.bookmarks.onCreated.addListener(() => {
		store.dispatch({ type: ACTION.BOOKMARKS_UPDATED });
	});
	chrome.bookmarks.onChanged.addListener(() => {
		store.dispatch({ type: ACTION.BOOKMARKS_UPDATED });
	});
	chrome.bookmarks.onRemoved.addListener(() => {
		store.dispatch({ type: ACTION.BOOKMARKS_UPDATED });
	});
};
