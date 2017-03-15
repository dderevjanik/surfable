import { MESSAGE, MessageType } from 'surfable-common/src/Messages';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { Group } from './../data/Group';
import { sendAction } from 'surfable-common/src/Sender';
import { IAppState } from './../interfaces/IAppState';
import { ICommand, COMMAND } from './../interfaces/ICommand';
import { ACTION, ActionType } from './Actions';
import { initState } from './AppState';
import { favoriteToCommand, tabToCommand, closedToCommand, bookmarkToCommand } from './../utils/CommandCreator';
import { searchCommands } from './../utils/Search';
import { notFoundCommand } from './../utils/DummyCommands';

export const appReducer = (state: IAppState = initState, action: ActionType | MessageType): IAppState => {
	switch (action.type) {
		case ACTION.PANEL_EXECUTE_COMMAND: {
			sendAction(state.foundCommands[state.offset].action);
			return {
				...state,
				opened: false
			};
		}
		case ACTION.PANEL_UP: {
			const nextOffset = (state.offset - 1);
			return (nextOffset < 0)
				? { ...state, offset: (state.foundCommands.length - 1) }
				: { ...state, offset: nextOffset };
		}
		case ACTION.PANEL_DOWN: {
			const nextOffset = (state.offset + 1);
			return (nextOffset >= state.foundCommands.length)
				? { ...state, offset: 0 }
				: { ...state, offset: nextOffset };
		}
		case ACTION.PANEL_OPEN: {
			return { ...state, inputVal: '', opened: true };
		}
		case ACTION.PANEL_CLOSE: {
			document.body.focus();
			return { ...state, opened: false };
		}
		case ACTION.SEARCH_CHANGE: {
			const searchValue = action.value.toLowerCase(); // Don't care about case
			if (state.searchMode === 0) {
				const commandsGroupsChars = Object.keys(state.commandsGroups); // @TODO don't calculate all object keys everytime
				const commandsGroupExists = (commandsGroupsChars.indexOf(action.value[0]) > -1); // Check if search value is from commands groups

				if (commandsGroupExists) {
					const foundCommands = searchCommands(searchValue.slice(1, searchValue.length), state.commandsGroups[searchValue[0]]);
					const hasFoundSomething = (foundCommands.length > 0);
					return {
						...state,
						offset: 0,
						inputVal: action.value,
						foundCommands: hasFoundSomething ? foundCommands : [notFoundCommand]
					};
				}
			} else {
				const foundCommands = searchCommands(searchValue.slice(1, searchValue.length), state.commands);
				const hasFoundSomething = (foundCommands.length > 0);
				return {
					...state,
					offset: 0,
					inputVal: action.value,
					foundCommands: hasFoundSomething ? foundCommands : [notFoundCommand]
				};
			}
			return {
				...state,
				inputVal: action.value,
				foundCommands: [notFoundCommand]
			};
		}
		case MESSAGE.TAB_HISTORY: {
			// @TODO don't use Message type here, it should be action or custom type
			const activeTab = state.chromeState.openedTabs.filter(tab => tab.id === state.chromeState.currentActiveTabId)[0];
			const historyCommands = activeTab.history.map(tab => closedToCommand(tab));
			return {
				...state,
				offset: 0,
				inputVal: '',
				searchMode: 1,
				commands: historyCommands,
				foundCommands: historyCommands
			};
		}
		case MESSAGE.SYNC_CHROME_STATE: {
			// @TODO dont create new tabs here, create them on 'background'
			// @TODO Sort them by commands groups
			const favoriteCommands: ICommand[] = action.chromeState.favorites
				.slice(0, 10)
				.map(favorite => favoriteToCommand(favorite));
			const openedTabCommands: ICommand[] = action.chromeState.openedTabs
				.map((tabHistory, index) => tabToCommand(tabHistory.history[0], index));
			const closedTabCommands: ICommand[] = action.chromeState.closedTabs
				.map(tab => closedToCommand(tab));
			const bookmarks: ICommand[] = action.chromeState.bookmarks
				.map(tab => bookmarkToCommand(tab));
			console.log(action.chromeState);
			return {
				...state,
				commandsGroups: {
					...state.commandsGroups,
					[Group.SWITCHTAB]: openedTabCommands,
					[Group.BOOKMARKS]: bookmarks
				},
				chromeState: action.chromeState
			};
		}
		default: {
			return state;
		}
	}
};
