import { store } from './redux/Store';
import { ACTION } from './redux/Actions';

/**
 * Will listen on events incoming from chrome
 */
export const eventListener = () => {
	chrome.tabs.onCreated.addListener((tab: chrome.tabs.Tab) => {
		store.dispatch({type: ACTION.TAB_CREATED, tab: tab});
	});
	chrome.tabs.onRemoved.addListener((tabId: number) => {
		store.dispatch({type: ACTION.TAB_REMOVED, tabId: tabId});
	});
	chrome.tabs.onUpdated.addListener((tabId: number, _info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
		store.dispatch({type: ACTION.TAB_UPDATED, tabId: tabId, tab: tab});
	});
};
