import { AppState, initState } from './AppState';
import { ACTION, ActionType } from './Actions';
import { findTabIndexById } from './Utils';
import { addToStack, addItem, removeItem, updateItem } from 'surfable-common/src/Immutable';
import { MAX_RECENT_TABS } from './../data/Constants';

export const appReducer = (state: AppState = initState, action: ActionType): AppState => {
	switch(action.type) {
		case ACTION.TAB_CREATED: {
			return {
				...state,
				openedTabs: addItem(state.openedTabs, action.tab)
			};
		}
		case ACTION.TAB_UPDATED: {
			const tabIndex = findTabIndexById(state, action.tabId);
			return {
				...state,
				openedTabs: updateItem(state.openedTabs, action.tab, tabIndex)
			};
		}
		case ACTION.TAB_REMOVED: {
			const tabIndex = findTabIndexById(state, action.tabId);
			return {
				...state,
				openedTabs: removeItem(state.openedTabs, tabIndex),
				closedTabs: addToStack(state.closedTabs, state.openedTabs[tabIndex], MAX_RECENT_TABS)
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
