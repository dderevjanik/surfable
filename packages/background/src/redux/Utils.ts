import { AppState } from './AppState';

export const findTabIndexById = (state: AppState, tabId: number) =>
	state.openedTabs.reduce((acc, tab, index) =>
		(tab.id === tabId) ? index : acc
	, -1);
