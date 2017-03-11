import { AppState } from './AppState';

/**
 * Return index of tab in openedtabs with specific id
 * @TODO extends to access more than just openedtabs
 */
export const findTabIndexById = (state: AppState, tabId: number): number =>
	state.openedTabs.reduce((acc, tab, index) =>
		(tab.id === tabId) ? index : acc
		, -1);
