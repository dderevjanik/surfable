import { AppState } from './AppState';

type Tab = chrome.tabs.Tab;

/**
 * Return index of tab in openedtabs with specific id
 * @TODO extere than just openedtabs
 */
export const findTabIndexById = (tabs: Tab[], tabId: number): number =>
	tabs.reduce((acc, tab, index) =>
		(tab.id === tabId) ? index : acc
		, -1);

/**
 * Get array of opened tabs
 */
export const getOpenedTabs = (tabs: Tab[][]): Tab[] =>
	tabs.map(t => t[0]);
