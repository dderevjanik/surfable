import { AppState, initState } from './AppState';
import { ACTION, ActionType } from './Actions';
import { addToStack, addItem, removeItem, updateItem } from '../../utils/Immutable';
import { MAX_RECENT_TABS } from './../data/Constants';

export const appReducer = (state: AppState = initState, action: ActionType): AppState => {
	switch (action.type) {
		case ACTION.TAB_CREATED: {
			const tabHistory = { id: action.tab.id, history: [action.tab] };
			return {
				...state,
				chromeState: {
					...state.chromeState,
					openedTabs: addItem(state.chromeState.openedTabs, tabHistory)
				}
			};
		}
		case ACTION.TAB_UPDATED: {
			const tabIndex = state.chromeState.openedTabs.map(t => t.id).indexOf(action.tabId);
			const openedTab = state.chromeState.openedTabs[tabIndex];
			if (tabIndex === -1) {
				throw new Error(`Cannot update a tab width id '${action.tabId}', which doesn't exist`);
			}

			const sameUrl = (openedTab.history[0].url === action.tab.url);
			const emptyUrl = (action.tab.url === '');
			const newTab = (action.tab.url === 'chrome://newtab/');
			if (sameUrl || emptyUrl || newTab) {
				return state;
			}

			const tabHistory = state.chromeState.openedTabs[tabIndex];
			const updatedTabHistory = {
				id: tabHistory.id,
				history: addToStack(tabHistory.history, action.tab, 10)
			};
			return {
				...state,
				chromeState: {
					...state.chromeState,
					openedTabs: updateItem(state.chromeState.openedTabs, updatedTabHistory, tabIndex)
				}
			};
		}
		case ACTION.TAB_REMOVED: {
			const tabIndex = state.chromeState.openedTabs.map(t => t.id).indexOf(action.tabId);
			if (tabIndex === -1) {
				throw new Error(`Cannot remove a tab width id '${action.tabId}', which doesn't exist`);
			}
			const closedTab = state.chromeState.openedTabs[tabIndex].history[0];
			return {
				...state,
				chromeState: {
					...state.chromeState,
					openedTabs: removeItem(state.chromeState.openedTabs, tabIndex),
					closedTabs: addToStack(state.chromeState.closedTabs, closedTab, MAX_RECENT_TABS)
				}
			};
		}
		case ACTION.TAB_ACTIVE_CHANGED: {
			return {
				...state,
				chromeState: {
					...state.chromeState,
					currentActiveTabId: action.activeTabId
				}
			}
		}
		case ACTION.BOOKMARKS_UPDATED: {
			// @TODO: finish updating bookmarks
			return { ...state };
		}
		default: {
			return state;
		}
	}
};
