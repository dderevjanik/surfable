import { AppState, initState } from './AppState';
import { ACTION, ActionType } from './Actions';
import { findTabIndexById } from './Utils';
import { addToStack, addItem, removeItem, updateItem } from 'surfable-common/src/Immutable';
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
			if (tabIndex === -1) {
				throw new Error(`Cannot update a tab width id '${action.tabId}', which doesn't exist`);
			}
			if (state.chromeState.openedTabs[tabIndex].history[0].url === action.tab.url) {
				// Url doesn't changed, don't add anything to history then
				return state;
			}
			const tabHistory = state.chromeState.openedTabs[tabIndex];
			const updatedHistory = {
				id: tabHistory.id,
				history: addToStack(tabHistory.history, action.tab, 10)
			};
			return {
				...state,
				chromeState: {
					...state.chromeState,
					openedTabs: updateItem(state.chromeState.openedTabs, updatedHistory, tabIndex)
				}
			};
		}
		case ACTION.TAB_REMOVED: {
			const tabIndex = state.chromeState.openedTabs.map(t => t.id).indexOf(action.tabId);
			if (tabIndex === -1) {
				throw new Error(`Cannot remove a tab width id '${action.tabId}', which doesn't exist`);
			}
			return {
				...state,
				chromeState: {
					...state.chromeState,
					openedTabs: removeItem(state.chromeState.openedTabs, tabIndex),
					closedTabs: addToStack(state.chromeState.closedTabs, state.chromeState.openedTabs[tabIndex].history[0], MAX_RECENT_TABS)
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
			// TODO: Add bookmarks handler
			return { ...state };
		}
		default: {
			return state;
		}
	}
};
