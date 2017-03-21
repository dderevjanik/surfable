import { sendAction } from '../../Sender';
import { IAppState } from '../../interfaces/IAppState';
import { ICommand } from '../../interfaces/ICommand';
import { Group } from '../../data/Group';
import { ESearchMode } from './../../enums/ESearchMode';
import { ACTION, ActionType } from './Actions';
import { initState } from './PopupState';
import { tabToCommand, bookmarkToCommand, changeUrlCommand } from '../../utils/CommandCreator';
import { searchCommands } from '../../utils/Search';
import { notFoundCommand } from '../../utils/DummyCommands';

export const appReducer = (state: IAppState = initState, action: ActionType): IAppState => {
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
			const searchValue = action.searchValue.toLowerCase(); // Don't care about case
			if (state.searchMode === ESearchMode.GROUPS) {
				// Searching default commands groups
				const commandsGroupsChars = Object.keys(state.commandsGroups); // @TODO don't calculate all object keys everytime
				const commandsGroupExists = (commandsGroupsChars.indexOf(searchValue[0]) > -1); // Check if search value is from commands groups

				if (commandsGroupExists) {
					const foundCommands = searchCommands(searchValue.slice(1, searchValue.length), state.commandsGroups[searchValue[0]]);
					const hasFoundSomething = (foundCommands.length > 0);
					return {
						...state,
						offset: 0,
						inputVal: action.searchValue,
						foundCommands: hasFoundSomething ? foundCommands : [notFoundCommand]
					};
				}
			} else {
				// Searching custom commands
				const foundCommands = searchCommands(searchValue.slice(1, searchValue.length), state.commands);
				const hasFoundSomething = (foundCommands.length > 0);
				return {
					...state,
					offset: 0,
					inputVal: action.searchValue,
					foundCommands: hasFoundSomething ? foundCommands : [notFoundCommand]
				};
			}
			return {
				...state,
				inputVal: action.searchValue,
				foundCommands: [notFoundCommand]
			};
		}
		case ACTION.TAB_SHOW_HISTORY: {
			const activeTab = state.chromeState.openedTabs.filter(tab => tab.id === state.chromeState.currentActiveTabId)[0];
			const historyCommands = activeTab.history.map(tab => changeUrlCommand(tab));
			return {
				...state,
				offset: 0,
				inputVal: '',
				searchMode: ESearchMode.COMMANDS,
				commands: historyCommands,
				foundCommands: historyCommands
			};
		}
		case ACTION.SYNC_CHROME_STATE: {
			// @TODO dont create new tabs here, create them on 'background'
			// @TODO Sort them by commands groups

			// const favoriteCommands: ICommand[] = action.chromeState.favorites
			// 	.slice(0, 10)
			// 	.map(favorite => favoriteToCommand(favorite));
			const openedTabCommands: ICommand[] = action.chromeState.openedTabs
				.map((tabHistory, index) => tabToCommand(tabHistory.history[0], index));
			// const closedTabCommands: ICommand[] = action.chromeState.closedTabs
			// 	.map(tab => closedToCommand(tab));
			const bookmarks: ICommand[] = action.chromeState.bookmarks
				.map(tab => bookmarkToCommand(tab));
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
