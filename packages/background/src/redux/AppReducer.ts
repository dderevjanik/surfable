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
				openedTabs: addItem(state.openedTabs, tabHistory)
			};
		}
		case ACTION.TAB_UPDATED: {
			const tabIndex = state.openedTabs.map(t => t.id).indexOf(action.tabId);
			const tabHistory = state.openedTabs[tabIndex];
			const updatedHistory = { id: tabHistory.id, history: addToStack(tabHistory.history, action.tab, 10) };
			return {
				...state,
				openedTabs: updateItem(state.openedTabs, updatedHistory, tabIndex)
			};
		}
		case ACTION.TAB_REMOVED: {
			const tabIndex = state.openedTabs.map(t => t.id).indexOf(action.tabId);
			return {
				...state,
				openedTabs: removeItem(state.openedTabs, tabIndex),
				closedTabs: addToStack(state.closedTabs, state.openedTabs[tabIndex].history[0], MAX_RECENT_TABS)
			};
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
